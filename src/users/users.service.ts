import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserType>) {}

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
}
