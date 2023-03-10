import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  uid: string;

  @Field(() => String)
  message: string;
}
