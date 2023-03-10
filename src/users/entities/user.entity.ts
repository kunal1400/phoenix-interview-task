import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Prop({ type: String })
  uid: string;

  @Field(() => String)
  @Prop({ type: String })
  first_name: string;

  @Field(() => String)
  @Prop({ type: String })
  last_name: string;

  @Field(() => String)
  @Prop({ type: String })
  username: string;

  @Field(() => String)
  @Prop({ type: String })
  email: string;

  @Field(() => String)
  @Prop({ type: String })
  message: string;
}

export type UserType = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);