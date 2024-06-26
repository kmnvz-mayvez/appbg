import { createAuthUser, getUserByUsernameOrEmail } from '@auth/services/auth.service';
import { faker } from '@faker-js/faker';
import { BadRequestError, firstLetterUppercase, lowerCase, seedPlate } from '@kmnvz-mayvez/myapp-share';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { Request, Response } from 'express';
import { generateUsername } from 'unique-username-generator';
import { v4 as uuidV4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { sample } from 'lodash';

export async function create(req: Request, res: Response): Promise<void> {
  const { count } = req.params;
  const usernames: string[] = [];
  for (let i = 0; i < parseInt(count, 10); i++) {
    const username: string = generateUsername('', 0, 12);
    usernames.push(firstLetterUppercase(username));
  }

  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i];
    const email = faker.internet.email();
    const password = 'qwerty';
    const phoneNumber = faker.phone.number();
    const plateNumber = `${sample(seedPlate)}`;
    const hourStay = faker.number.int({ min: 1, max: 10 });
    const costPerHour = 5000;
    const totalCost = hourStay * costPerHour;
    const profilePicture = faker.image.urlPicsumPhotos();
    const checkIfUserExist: IAuthDocument | undefined = await getUserByUsernameOrEmail(username, email);
    if (checkIfUserExist) {
      throw new BadRequestError('Invalid credentials. Email or Username', 'Seed create() method error');
    }
    const profilePublicId = uuidV4();
    const authData: IAuthDocument = {
      username: firstLetterUppercase(username),
      email: lowerCase(email),
      profilePublicId,
      password,
      plateNumber,
      hourStay,
      cost: totalCost,
      phoneNumber,
      profilePicture
    } as IAuthDocument;

    await createAuthUser(authData);

  }
  res.status(StatusCodes.OK).json({ message: 'Seed users for auth created successfully.' });
}
