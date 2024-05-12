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
    platNumber?: string;
    cost?: number;
    hourStay?: number;
    username?: string;
    email?: string;
    phoneNumber: string;
    createdAt?: Date | string;
}