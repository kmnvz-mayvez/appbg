import { getAuthUserById } from '@auth/services/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument } from '@auth/interfaces/auth.interface';

export async function read(req: Request, res: Response): Promise<void> {
  let user = null;
  const existingUser: IAuthDocument | undefined = await getAuthUserById(req.currentUser!.id);
  if (Object.keys(existingUser!).length) {
    user = existingUser;
  }
  res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
}
