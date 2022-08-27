import SecondModal from 'components/shared/Modal';
import { ReactNode, useState } from 'react';

export interface SecondModalActionsType {
  open: () => void;
  close: () => void;
}

export type ReturnComponentType = ({
  children,
}: ReturnSecondModalProps) => JSX.Element;

interface SecondModalProps {
  title: string;
  component?: ReturnComponentType;
}

interface ReturnSecondModalProps {
  children?: ReactNode;
}

const useModal = ({
  title,
  component,
}: SecondModalProps): [
  boolean,
  SecondModalActionsType,
  ReturnComponentType,
] => {
  const [toggle, setToggle] = useState<boolean>(false);

  const actions: SecondModalActionsType = {
    open: function () {
      setToggle(true);
    },
    close: function () {
      setToggle(false);
    },
  };

  return [
    toggle,
    actions,
    ({ children }) => (
      <SecondModal
        active={toggle}
        actions={actions}
        title={title}
        component={component}
      >
        {children}
      </SecondModal>
    ),
  ];
};

export default useModal;
