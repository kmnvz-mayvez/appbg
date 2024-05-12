import { userSchema } from '@users/schemes/user';
import { updateUser } from '@users/services/user.service';
import { IUserDocument } from '@users/interface/user.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@kmnvz-mayvez/myapp-share';

const userUpdate = async (req: Request, res: Response): Promise<void> => {
    const { error } = await Promise.resolve(userSchema.validate(req.body));
    if (error?.details) {
        throw new BadRequestError(error.details[0].message, 'Update user() method error');
    }
    const user: IUserDocument = {
        platNumber: req.body.platNumber,
        hourStay: req.body.hourStay
    };
    const updatedUser: IUserDocument = await updateUser(req.params.userId, user);
    res.status(StatusCodes.OK).json({ message: 'Seller created successfully.', user: updatedUser });
};

export { userUpdate };
