import { YoutubeVideosItemType } from 'api/youtube';
import Modal from 'components/shared/Modal';
import { ReactNode, useState } from 'react';

interface ModalParamsProps {
  title?: string;
  component?: ReturnComponentType;
}
export interface ModalActionsType {
  open: ({ sTitle, item }: OpenModalParamsType) => void;
  close: () => void;
}

export type ReturnComponentType = ({
  children,
}: ReturnModalProps) => JSX.Element;

interface OpenModalParamsType {
  sTitle?: string;
  item?: YoutubeVideosItemType;
}
interface ReturnModalProps {
  children?: ReactNode;
}

const useModal = ({
  title,
  component,
}: ModalParamsProps): [
  boolean,
  ModalActionsType,
  ReturnComponentType,
  YoutubeVideosItemType?,
] => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [subTitle, setSubTitle] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<YoutubeVideosItemType>();

  const actions: ModalActionsType = {
    open: function ({ sTitle, item }: OpenModalParamsType) {
      setToggle(true);
      if (sTitle) setSubTitle(sTitle);
      if (item) setVideoInfo(item);
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
    videoInfo,
  ];
};

export default useModal;
