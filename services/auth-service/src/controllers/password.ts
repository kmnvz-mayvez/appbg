import { changePasswordSchema, emailSchema, passwordSchema } from '@auth/schemes/password';
import { getAuthUserByPasswordToken, getUserByEmail, getUserByUsername, updatePassword } from '@auth/services/auth.service';
import { BadRequestError, IAuthDocument } from '@kmnvz-mayvez/myapp-share';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthModel } from '@auth/models/auth.schema';

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(emailSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Password forgotPassword() method error');
  }
  const { email } = req.body;
  const existingUser: IAuthDocument | undefined = await getUserByEmail(email);
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials', 'Password forgotPassword() method error');
  }

  res.status(StatusCodes.OK).json({ message: 'Password reset email sent.' });
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(passwordSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Password resetPassword() method error');
  }
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  if (password !== confirmPassword) {
    throw new BadRequestError('Passwords do not match', 'Password resetPassword() method error');
  }
  const existingUser: IAuthDocument | undefined = await getAuthUserByPasswordToken(token);
  if (!existingUser) {
    throw new BadRequestError('Reset token has expired', 'Password resetPassword() method error');
  }
  const hashedPassword: string = await (AuthModel.prototype as any).hashPassword(password);
  await updatePassword(existingUser.id!, hashedPassword);

  res.status(StatusCodes.OK).json({ message: 'Password successfully updated.' });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(changePasswordSchema.validate(req.body));

  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Password changePassword() method error');
  }

  const { newPassword } = req.body;

  const existingUser: IAuthDocument | undefined = await getUserByUsername(`${req.currentUser?.username}`);

  if (!existingUser) {
    throw new BadRequestError('Invalid password', 'Password changePassword() method error');
  }

  const hashedPassword: string = await (AuthModel.prototype as any).hashPassword(newPassword);
  await updatePassword(existingUser.id!, hashedPassword);

  res.status(StatusCodes.OK).json({ message: 'Password successfully updated.' });
}
