import {
  ComponentProps,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
} from 'react';
import reactDom from 'react-dom';

import { ReturnComponentType, ModalActionsType } from 'hooks/useModal';
import * as S from './Modal.styled';

interface ModalProps {
  children?: ReactNode;
  toggle: boolean;
}

interface SecondModalProps {
  active: boolean;
  title?: string;
  subTitle?: string;
  actions: ModalActionsType;
  children?: ReactNode;
  component?: ReturnComponentType;
}

const SecondModal = ({
  active,
  title,
  actions,
  subTitle,
  children,
  component: Component,
}: SecondModalProps) => {
  const el = document.getElementById('modal')!;

  return reactDom.createPortal(
    <Background toggle={active} onClick={actions.close}>
      <Wrapper>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        {children}
        {Component && <Component>{children}</Component>}
      </Wrapper>
    </Background>,
    el,
  );
};

// interface BackgroundProps extends ComponentProps<'div'> {
interface BackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  toggle: boolean;
}

const Background = ({ children, toggle, onClick }: BackgroundProps) => {
  return (
    <S.BlackBackground onClick={onClick} toggle={toggle}>
      {children}
    </S.BlackBackground>
  );
};

const Title = ({ children }: Omit<ModalProps, 'toggle'>) => {
  return <S.Title>{children}</S.Title>;
};

const SubTitle = ({ children }: Omit<ModalProps, 'toggle'>) => {
  return <S.SubTitle>{children}</S.SubTitle>;
};

const Wrapper = ({ children }: Omit<ModalProps, 'toggle'>) => {
  const test = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <S.ModalContentWrapper onClick={test}>{children}</S.ModalContentWrapper>
  );
};

export default SecondModal;
