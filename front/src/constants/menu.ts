import instance from 'api/instance';

export const LOGIN_MENU = [
  {
    text: '로그인',
    name: 'login',
    show: false,
    onClick: async () => {},
  },
  {
    text: '로그아웃',
    name: 'logout',
    show: true,
    onClick: async () => {
      const res = await instance.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res);
    },
  },
];

export const AUTH_HEADER_MENU = [
  {
    text: '마이페이지',
    name: 'myPage',
    link: '/',
  },
  {
    text: '공유하기',
    name: 'share',
    link: '/',
  },
];
