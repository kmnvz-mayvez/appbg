import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { userService } from '@gateway/services/api/user.service';

export class UserSeed {
  public async user(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await userService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
