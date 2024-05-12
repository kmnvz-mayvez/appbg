import { faker } from '@faker-js/faker';
import { IUserDocument } from '@users/interface/user.interface';
import { Request, Response } from 'express';
import { sample } from 'lodash';
import { createUser, getRandomUsers, getUserByEmail } from '@users/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, seedPlate } from '@kmnvz-mayvez/myapp-share';

const seed = async (req: Request, res: Response): Promise<void> => {
    const { count } = req.params;
    const users: IUserDocument[] = await getRandomUsers(parseInt(count, 10));
    for (let i = 0; i < users.length; i++) {
        const user: IUserDocument = users[i];
        const checkIfUserExist: IUserDocument | null = await getUserByEmail(`${user.email}`);
        if (checkIfUserExist) {
            throw new BadRequestError('User already exist.', 'Seed user() method error');
        }
        const seed: IUserDocument = {
            profilePublicId: uuidv4(),
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture,
            platNumber: `${sample(seedPlate)}`,
            hourStay: faker.number.int({ min: 1, max: 10 })
        };
        await createUser(seed);
    }
    res.status(StatusCodes.CREATED).json({ message: 'User seed created successfully' });
};

export { seed };
