import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSideMenu } from "store/globalSlice";
import { IStyledComponent } from "styled-components";

interface MenuProps {
  isAuth?: boolean;
  menus: {
    text: string;
    name: string;
    link: string;
  }[];
  element: IStyledComponent<any, any>;
}

const Menu = ({ isAuth, menus, element: Component }: MenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doFunction = (link: string) => {
    navigate(link, { replace: true });
    dispatch(toggleSideMenu(false));
  };

  return (
    <>
      {menus.map(({ text, link, name }) => (
        <Component key={name} onClick={() => doFunction(link)}>
          {text}
        </Component>
      ))}
    </>
  );
};

export default Menu;
