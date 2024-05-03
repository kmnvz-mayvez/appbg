import { getAuthUserById, getUserByEmail } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument, IEmailMessageDetails, lowerCase } from '@kmnvz-mayvez/myapp-share';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';

export async function read(req: Request, res: Response): Promise<void> {
  let user = null;
  const existingUser: IAuthDocument | undefined = await getAuthUserById(req.currentUser!.id);
  if (Object.keys(existingUser!).length) {
    user = existingUser;
  }
  res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
}

export async function resendEmail(req: Request, res: Response): Promise<void> {
  const { email, userId } = req.body;
  const checkIfUserExist: IAuthDocument | undefined = await getUserByEmail(lowerCase(email));
  if (!checkIfUserExist) {
    throw new BadRequestError('Email is invalid', 'CurrentUser resentEmail() method error');
  }
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: lowerCase(email)
  };
  await publishDirectMessage(
    authChannel,
    'email-notification',
    'auth-email',
    JSON.stringify(messageDetails),
    'email message has been sent.'
  );
  const updatedUser = await getAuthUserById(parseInt(userId));
  res.status(StatusCodes.OK).json({ message: 'Email sent', user: updatedUser });
}
