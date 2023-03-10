import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserType>,
    private readonly httpService: HttpService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    return await this.userModel.create(createUserInput);
  }

  async findAll(): Promise<UserType[]> {
    return await this.userModel.find();
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UserType> {
    const modifiedUserInput = {
      ...updateUserInput,
      message: `manual - ${updateUserInput.message}`,
    };

    const updateResponse = await this.userModel.findOneAndUpdate(
      { uid: id },
      modifiedUserInput,
    );

    if (!updateResponse) {
      throw new NotFoundException('Not found');
    } else {
      return await this.userModel.findOne({ uid: id });
    }
  }

  async populateDefaultUser() {
    const userInfo = await this.httpService.get(process.env.DUMMY_USERS_API);
    const userData = await lastValueFrom(userInfo);
    const oldRecordsCount = await this.userModel.count();
    if (oldRecordsCount === 0) {
      return await this.create(userData.data);
    } else {
      return userData;
    }
  }

  @Cron('59 * * * * *')
  async handleCron() {
    const currentdate = new Date();
    const datetime =
      'automated - ' +
      currentdate.getDate() +
      '-' +
      +(currentdate.getMonth() + 1) +
      '-' +
      +currentdate.getFullYear() +
      ' ' +
      +currentdate.getHours() +
      ':' +
      +currentdate.getMinutes() +
      ':' +
      +currentdate.getSeconds();
    return await this.userModel.updateMany({ message: datetime });
  }
}
