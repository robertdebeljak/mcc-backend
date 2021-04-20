import { NextFunction, Request, Response } from 'express';

import NetworkOperatorData from '../models/NetworkOperatorData';
import Country from '../models/Country';
import { SORT_ORDER } from '../types';

export async function getCodeList(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit: queryLimit, offset: queryOffset, search, sortBy = null, sortOrder = SORT_ORDER.DESC } = req.query;

    const limit: number = queryLimit ? parseInt(queryLimit as string, 10) : 50;
    const offset: number = queryOffset ? parseInt(queryOffset as string, 10) : 0;
    Country.find();
    const query = NetworkOperatorData.find().where('name', new RegExp(search as string, 'gi'));
    const totalCount = await NetworkOperatorData.count(query);
    const data = await NetworkOperatorData.aggregate([
      {
        $match: {
          name: new RegExp(search as string, 'gi')
        }
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: '_id',
          as: 'country',
        },
      },
      {
        $unwind: '$country',
      },
      {
        $sort: { [sortBy as any]: sortOrder === SORT_ORDER.ASC ? 1 : (sortOrder === SORT_ORDER.DESC ? -1 : 0) }
      },
      {
        $skip: offset * limit
      },
      {
        $limit: limit,
      },
    ]);

    res.json({
      data,
      totalCount
    });
  } catch (err) {
    next(err);
  }
}
