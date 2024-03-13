import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toggleSideMenu, userLogout } from "store/globalSlice";
import instance from "api/instance";

const useMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actions = {
    logout: async function () {
      const res = await instance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(userLogout());
      dispatch(toggleSideMenu(false));
      navigate("/");
    },
    login: function () {},
    movePage: function (link: string) {
      navigate(link);
    },
  };

  return [actions];
};

export default useMenu;
