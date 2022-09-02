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
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const modifyUser = async (userInfo: GetUserDataType) => {
  try {
    const { data } = await instance.put('/user', { userInfo });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const withDrawUser = async () => {
  try {
    const { data } = await instance.post('/user/withdraw');
    console.log(data);
  } catch (e) {}
};
