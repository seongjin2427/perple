import instance from 'api/instance';

export interface GetUserDataType {
  email: string;
  nickname: string;
  profileImage: string;
  [key: string]: string;
}

export const getUser = async () => {
  try {
    const { data } = await instance.get<GetUserDataType>('/user');
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const modifyUser = async (userInfo: GetUserDataType) => {
  try {
    const { data } = await instance.put('/user', { userInfo });
  } catch (e) {
    console.log(e);
  }
};

export const withDrawUser = async () => {
  try {
    const { data } = await instance.post('/user/withdraw');
  } catch (e) {}
};
