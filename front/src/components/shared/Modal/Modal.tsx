import { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import reactDom from 'react-dom';
import { ReturnComponentType, SecondModalActionsType } from 'hooks/useModal';
import * as S from './Modal.styled';

interface ModalProps {
  children?: ReactNode;
  toggle: boolean;
}

interface SecondModalProps {
  active: boolean;
  title: string;
  actions: SecondModalActionsType;
  children?: ReactNode;
  component?: ReturnComponentType;
}

const SecondModal = ({
  active,
  title,
  actions,
  children,
  component: Component,
}: SecondModalProps) => {
  const el = document.getElementById('modal')!;

  return reactDom.createPortal(
    <Background toggle={active} onClick={actions.close}>
      <Wrapper>
        <Title>{title}</Title>
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

const Wrapper = ({ children }: Omit<ModalProps, 'toggle'>) => {
  return <S.ModalContentWrapper>{children}</S.ModalContentWrapper>;
};

export default SecondModal;
