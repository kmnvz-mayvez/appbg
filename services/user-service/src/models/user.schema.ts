import { IUserDocument } from '@users/interface/user.interface';
import { Model, Schema, model } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    profilePicture: { type: String, required: true },
    hourStay: { type: Number, required: false },
    cost: { type: Number, required: false },
    plateNumber: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date }
  },
  {
    versionKey: false
  }
);

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };
