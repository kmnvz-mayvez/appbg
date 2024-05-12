import { getUserByEmail, getUserByUsername, getUserByPlate, getUserByStay } from '@users/services/user.service';
import { IUserDocument } from '@users/interface/user.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const email = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserByEmail(req.currentUser!.email);
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

const hour = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserByStay(parseInt(req.params.hour));
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

const plate = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserByPlate(req.params.plate);
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

const currentUsername = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserByUsername(req.currentUser!.username);
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

const username = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserByUsername(req.params.username);
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

export { email, username, currentUsername, plate, hour };
