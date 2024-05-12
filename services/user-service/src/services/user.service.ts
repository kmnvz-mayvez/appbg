import { UserModel } from '@users/models/user.schema';
import { IUserDocument } from '@users/interface/user.interface';

const getUserByEmail = async (email: string): Promise<IUserDocument | null> => {
  const user: IUserDocument | null = await UserModel.findOne({ email }).exec() as IUserDocument;
  return user;
};

const getUserByUsername = async (username: string): Promise<IUserDocument | null> => {
  const user: IUserDocument | null = await UserModel.findOne({ username }).exec() as IUserDocument;
  return user;
};

const getUserByPlate = async (platNumber: string): Promise<IUserDocument | null> => {
  const user: IUserDocument | null = await UserModel.findOne({ platNumber }).exec() as IUserDocument;
  return user;
};

const getUserByStay = async (hourStay: number): Promise<IUserDocument | null> => {
  const user: IUserDocument | null = await UserModel.findOne({ hourStay }).exec() as IUserDocument;
  return user;
}

const getRandomUsers = async (count: number): Promise<IUserDocument[]> => {
  const users: IUserDocument[] = await UserModel.aggregate([{ $sample: { size: count } }]);
  return users;
};

const createUser = async (userData: IUserDocument): Promise<void> => {
  const checkIfUserExist: IUserDocument | null = await getUserByEmail(`${userData.email}`);
  if (!checkIfUserExist) {
    await UserModel.create(userData);
  }
};

const updateUser = async (userId: string, userData: IUserDocument): Promise<IUserDocument> => {
  const updatedUser: IUserDocument = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        platNumber: userData.platNumber,
        hourStay: userData.hourStay
      }
    },
    { new: true }
  ).exec() as IUserDocument;
  return updatedUser;
};


export {
  getUserByEmail,
  getUserByUsername,
  getRandomUsers,
  getUserByPlate,
  getUserByStay,
  createUser,
  updateUser
};

