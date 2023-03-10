import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  uid: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  message: string;
}
