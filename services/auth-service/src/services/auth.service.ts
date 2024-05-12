import { config } from '@auth/config';
import { AuthModel } from '@auth/models/auth.schema';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { firstLetterUppercase, lowerCase, winstonLogger } from '@kmnvz-mayvez/myapp-share';
import { IAuthDocument, IAuthMessageDetails } from '@auth/interfaces/auth.interface';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { Model, Op } from 'sequelize';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authService', 'debug');

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument | undefined> {
    try {
        const result: Model = await AuthModel.create(data);
        const messageDetails: IAuthMessageDetails = {
            username: result.dataValues.username!,
            email: result.dataValues.email!,
            profilePicture: result.dataValues.profilePicture!,
            plateNumber: result.dataValues.plateNumber!,
            hourStay: result.dataValues.hourStay!,
            cost: result.dataValues.cost!,
            phoneNumber: result.dataValues.phoneNumber!,
            createdAt: result.dataValues.createdAt!,
            type: 'auth'
        };
        await publishDirectMessage(
            authChannel,
            'user-update',
            'user',
            JSON.stringify(messageDetails),
            'Users details sent to mongodb.'
        );
        const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
        return userData;
    } catch (error) {
        log.error(error);
    }
}

export async function getAuthUserById(authId: number): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: { id: authId },
            attributes: {
                exclude: ['password']
            }
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        log.error(error);
    }
}

export async function getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: {
                [Op.or]: [{ username: firstLetterUppercase(username) }, { email: lowerCase(email) }]
            },
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        log.error(error);
    }
}

export async function getUserByUsername(username: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: { username: firstLetterUppercase(username) },
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        log.error(error);
    }
}

export async function getUserByEmail(email: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: { email: lowerCase(email) },
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        log.error(error);
    }
}

export async function getAuthUserByVerificationToken(token: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: { emailVerificationToken: token },
            attributes: {
                exclude: ['password']
            }
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        log.error(error);
    }
}

export async function getAuthUserByPasswordToken(token: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: {
                [Op.and]: [{ passwordResetToken: token }, { passwordResetExpires: { [Op.gt]: new Date() } }]
            },
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        log.error(error);
    }
}

export async function updatePasswordToken(authId: number, token: string, tokenExpiration: Date): Promise<void> {
    try {
        await AuthModel.update(
            {
                passwordResetToken: token,
                passwordResetExpires: tokenExpiration
            },
            { where: { id: authId } },
        );
    } catch (error) {
        log.error(error);
    }
}

export async function updatePassword(authId: number, password: string): Promise<void> {
    try {
        await AuthModel.update(
            {
                password,
                passwordResetToken: '',
                passwordResetExpires: new Date()
            },
            { where: { id: authId } },
        );
    } catch (error) {
        log.error(error);
    }
}

export function signToken(id: number, email: string, username: string): string {
    return sign(
        {
            id,
            email,
            username
        },
        config.JWT_TOKEN!
    );
}