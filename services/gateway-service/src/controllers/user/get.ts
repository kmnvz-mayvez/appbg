import { userService } from '@gateway/services/api/user.service';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export class Get {
    public async email(_req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getUserByEmail();
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async currentUsername(_req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getCurrentUserByUsername();
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async username(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getUserByUsername(req.params.username);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async plate(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getUserByPlate(req.params.plate);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async hour(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getUserByStay(parseInt(req.params.plate));
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }
}
