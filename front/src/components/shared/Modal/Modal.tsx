import useModal from 'hooks/useModal';
import React from 'react';

import * as S from './Modal.styled';

interface ModalProps {
  title: string;
  element: JSX.Element;
}

const Modal = ({ title, element }: ModalProps) => {
  const [modalShowBoolean, { close }] = useModal();

  return (
    <S.Container active={modalShowBoolean} onClick={close}>
      <S.ModalWrapper>
        <S.Title>{title}</S.Title>
        {element}
      </S.ModalWrapper>
    </S.Container>
  );
};

export default React.memo(Modal);
