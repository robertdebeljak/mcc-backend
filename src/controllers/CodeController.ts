import { Request, Response, NextFunction } from 'express';
import NetworkOperatorData from '../models/NetworkOperatorData';
import Country from '../models/Country';

export async function getCodeList(req: Request, res: Response, next: NextFunction) {
  try {
    const { limit: queryLimit, offset: queryOffset, search } = req.query;

    const limit: number = queryLimit ? parseInt(queryLimit as string, 10) : 50;
    const offset: number = queryOffset ? parseInt(queryOffset as string, 10) : 0;
    Country.find();
    const query = NetworkOperatorData.find();

    if (search) query.where('name', new RegExp(search as string, 'gi'));

    const totalCount = await NetworkOperatorData.count(query);
    const data = await query.skip(offset * limit).limit(limit).populate('country').exec();

    res.json({
      data,
      totalCount
    });
  } catch (err) {
    next(err);
  }
}
