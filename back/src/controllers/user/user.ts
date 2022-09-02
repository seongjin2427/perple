import { RequestHandler } from 'express';

import User from '@/src/models/user';

export const getUser: RequestHandler = async (req, res, next) => {
  console.log('getUser');
  const result = await User.findById(req.userInfo?._id).select(
    'email nickname profileImage',
  );

  res.status(200).json(result);
};

export const modifyUser: RequestHandler = async (req, res, next) => {
  console.log('modifyUser');
  const userInfo = req.body.userInfo;
  console.log('userInfo', userInfo);
  req.userInfo?.modifyUser(userInfo);

  res.status(200).json({ message: '수정 완료!' });
};
