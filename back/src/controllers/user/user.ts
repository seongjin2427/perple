import User from '@/src/models/user';
import { Request, Response, NextFunction } from 'express';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('getUser');
  const result = await User.findById(req.userInfo?._id).select(
    'email nickname profileImage',
  );

  res.status(200).json(result);
};
