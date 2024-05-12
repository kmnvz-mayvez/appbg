export interface IAuthDocument {
    id?: number;
    profilePublicId?: string;
    username?: string;
    email?: string;
    password?: string;
    plateNumber?: string;
    hourStay?: number;
    phoneNumber?: string;
    cost?: number;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    comparePassword(password: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface IAuthMessageDetails {
    username?: string;
    profilePicture?: string;
    email?: string;
    plateNumber?: string;
    hourStay?: number;
    cost?: number;
    phoneNumber?: string;
    createdAt?: Date;
    type?: string;
}