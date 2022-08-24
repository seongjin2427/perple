import User from '@/src/models/user';

interface UserType {
  snsId: string;
  email: string;
  nickname: string;
  profileImage: string;
  type: string;
}

export const saveUser = async (userInfo: UserType) => {
  const newUser = new User(userInfo);
  try {
    await newUser.save();
    return newUser.id;
  } catch (e) {
    return 'Fail to save the new User';
  }
};

export const findUserBySnsId = async (type: string, snsId: string) => {
  const user = await User.findOne({ type, snsId });

  if (user) return user.id;
  else return '';
};

export const findUserByObjectId = async (userId: string) => {
  const user = await User.findById(userId);

  if (user) return user;
  else return '';
};
