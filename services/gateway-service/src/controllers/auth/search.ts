
import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Search {
  public async userById(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.getUser(req.params.userId);
    res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
  }

  public async users(req: Request, res: Response): Promise<void> {
    const { from, size, type } = req.params;
    let query = '';
    const objList = Object.entries(req.query);
    const lastItemIndex = objList.length - 1;
    objList.forEach(([key, value], index) => {
      query += `${key}=${value}${index !== lastItemIndex ? '&' : ''}`;
    });
    const response: AxiosResponse = await authService.getUsers(`${query}`, from, size, type);
    res.status(StatusCodes.OK).json({ message: response.data.message, total: response.data.total, users: response.data.users });
  }
}
