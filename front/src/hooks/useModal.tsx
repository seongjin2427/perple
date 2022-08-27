import Modal from 'components/shared/Modal';
import { ReactNode, useState } from 'react';

export interface ModalActionsType {
  open: (sTitle?: string) => void;
  close: () => void;
}

export type ReturnComponentType = ({
  children,
}: ReturnModalProps) => JSX.Element;

interface ModalProps {
  title: string;
  component?: ReturnComponentType;
}

interface ReturnModalProps {
  children?: ReactNode;
}

const useModal = ({
  title,
  component,
}: ModalProps): [boolean, ModalActionsType, ReturnComponentType] => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [subTitle, setSubTitle] = useState<string>('');

  const actions: ModalActionsType = {
    open: function (sTitle?: string) {
      setToggle(true);
      if (sTitle) setSubTitle(sTitle);
    },
    close: function () {
      setToggle(false);
    },
  };

  return [
    toggle,
    actions,
    ({ children }) => (
      <Modal
        active={toggle}
        actions={actions}
        title={title}
        subTitle={subTitle}
        component={component}
      >
        {children}
      </Modal>
    ),
  ];
};

export default useModal;
