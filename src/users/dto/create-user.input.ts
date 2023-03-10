import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  uid: string;

  @Field(() => String)
  @IsString()
  first_name: string;

  @Field(() => String)
  @IsString()
  last_name: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  message: string;
}
