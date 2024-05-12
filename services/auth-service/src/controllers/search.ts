import { userById, userSearch } from '@auth/services/search.service';
import { IPaginateProps, ISearchResult } from '@kmnvz-mayvez/myapp-share';
import { Request, Response } from 'express';
import { sortBy } from 'lodash';
import { StatusCodes } from 'http-status-codes';

export async function user(req: Request, res: Response): Promise<void> {
  const { from, size, type } = req.params;
  let resultHits: unknown[] = [];
  const paginate: IPaginateProps = { from, size: parseInt(`${size}`), type };
  const users: ISearchResult = await userSearch(
    `${req.query.query}`,
    paginate,
    `${req.query.stay_time}`,
    parseInt(`${req.query.minCost}`),
    parseInt(`${req.query.maxCost}`),
  );

  for (const item of users.hits) {
    resultHits.push(item._source);
  }

  if (type === 'backward') {
    resultHits = sortBy(resultHits, ['sortId']);
  }

  res.status(StatusCodes.OK).json({ message: 'Search users results', total: users.total, users: resultHits });
}

export async function singleUserById(req: Request, res: Response): Promise<void> {
  const user = await userById('users', req.params.userId);

  res.status(StatusCodes.OK).json({ message: 'Single user result', user });
}
