import crypto from 'crypto';
import { signupSchema } from '@auth/schemes/signup';
import { createAuthUser, getUserByUsernameOrEmail, signToken } from '@auth/services/auth.service';
import { BadRequestError, firstLetterUppercase, lowerCase, uploads } from '@kmnvz-mayvez/myapp-share';
import { Request, Response } from 'express';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { v4 as uuidV4 } from 'uuid';
import { UploadApiResponse } from 'cloudinary';
import { StatusCodes } from 'http-status-codes';

export async function create(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(signupSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignUp create() method error');
  }
  const { username, email, password, phoneNumber, profilePicture, plateNumber } = req.body;
  const checkIfUserExist: IAuthDocument | undefined = await getUserByUsernameOrEmail(username, email);

  if (checkIfUserExist) {
    throw new BadRequestError('Invalid credentials. Email or Username', 'SignUp create() method error');
  }

  const profilePublicId = uuidV4();
  const uploadResult: UploadApiResponse = await uploads(profilePicture, `${profilePublicId}`, true, true) as UploadApiResponse;

  if (!uploadResult.public_id) {
    throw new BadRequestError('File upload error. Try again', 'SignUp create() method error');
  }

  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  const authData: IAuthDocument = {
    username: firstLetterUppercase(username),
    email: lowerCase(email),
    profilePublicId,
    password,
    plateNumber,
    phoneNumber,
    profilePicture: uploadResult?.secure_url,
    emailVerificationToken: randomCharacters
  } as unknown as IAuthDocument;

  const result: IAuthDocument = await createAuthUser(authData) as IAuthDocument;
  const userJWT: string = signToken(result.id!, result.email!, result.username!);

  res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: result, token: userJWT });
}
