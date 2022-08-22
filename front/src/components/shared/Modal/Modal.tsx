import { ModalActionsType } from 'hooks/useModal';
import React, { ReactNode } from 'react';

import * as S from './Modal.styled';

interface ModalProps {
  children: ReactNode;
  title: string;
  modalInfo: [boolean, ModalActionsType];
}

const Modal = ({ children, title, modalInfo }: ModalProps) => {
  const [modalBoolean, actions] = modalInfo;

  return (
    <S.Container active={modalBoolean} onClick={actions.close}>
      <S.ModalWrapper>
        <S.Title>{title}</S.Title>
        {children}
      </S.ModalWrapper>
    </S.Container>
  );
};

export default React.memo(Modal);
