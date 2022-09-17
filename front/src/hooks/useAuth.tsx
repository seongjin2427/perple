import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from 'store/store';
import instance from 'api/instance';
import {
  toggleSideMenu,
  userInfoSet,
  userLogin,
  userLogout,
} from 'store/globalSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin: isAuth } = useSelector(({ global }: RootState) => global);

  const actions = {
    login: async function () {
      if (!isAuth) {
        try {
          const { data } = await instance.post(
            'http://localhost:8080/auth/token',
          );

          const accessToken = localStorage.getItem('Authorization');
          if (data.accessToken && accessToken) {
            localStorage.setItem('Authorization', data.accessToken);
            dispatch(userInfoSet(data.userInfo));
            dispatch(userLogin());
          } else {
            dispatch(userLogout());
            this.login();
          }
        } catch (e) {
          console.log('aaaa', e);
          dispatch(userLogout());
        }
      }
    },
    logout: async function () {
      const res = await instance.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(userLogout());
      dispatch(toggleSideMenu(false));
      navigate('/');
    },
    movePage: function (link: string) {
      navigate(link);
    },
  };

  return [actions];
};

export default useAuth;
