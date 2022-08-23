import { Request, Response, NextFunction } from 'express';

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    user: {
      id: 1,
      name: '뚠뚠이감자',
      description: '뚠뚠해요',
    },
  });
};