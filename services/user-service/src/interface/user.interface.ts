import { ObjectId } from "mongoose";

export type UserType =
    | string
    | string[]
    | number
    | Date
    | unknown
    | undefined;

export interface IUserDocument extends Record<string, UserType> {
    _id?: string | ObjectId;
    profilePublicId?: string;
    profilePicture?: string;
    plateNumber?: string;
    hourStay?: number;
    username?: string;
    cost?: number;
    email?: string;
    phoneNumber?: string;
    createdAt?: Date | string;
}