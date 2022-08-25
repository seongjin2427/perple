import styled, { css } from 'styled-components';
import { HEADER_HEIGHT } from 'constants/common';

export const Container = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  position: fixed;
  background: red;
  z-index: 5000;
  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.hex};
`;

export const LogoDiv = styled.div`
  width: 5rem;
  background: url(${require('../../assets/only_logo.png')}) center center
    no-repeat;
  background-size: contain;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 12rem;
      background: url(${require('../../assets/logo.png')}) center center
        no-repeat;
      background-size: contain;
    }
  `}
`;

export const SearchDiv = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  ${({ theme }) => css`
    ${theme.media.desktop} {
      justify-content: center;
    }
  `}
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0 0.75rem;

  border: 2px solid ${({ theme }) => theme.colors.secondary.hex};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary.hex};

  :focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary.hex};
  }
`;

export const SearchButton = styled.button`
  width: 5rem;
  height: 2.75rem;
  background: ${({ theme }) => theme.colors.secondary.hex};
  color: white;
  border: none;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => `rgba(${theme.colors.secondary.rgb}, 0.8)`};
  }
  :active {
    background: ${({ theme }) => theme.colors.secondary.hex};
  }
`;

interface HeaderMenuDivType {
  isAuth: boolean;
}

export const HeaderMenuDiv = styled.div<HeaderMenuDivType>`
  display: none;
  width: 22.5rem;

  ${({isAuth}) => !isAuth && css`
    width: 10rem;
  `}

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: flex;
      justify-content: center;
    }
  `}
`;

export const HeaderMenuUl = styled.ul`
  display: flex;
  align-items: center;
`;

export const HeaderMenuLi = styled.li`
  color: ${({ theme }) => theme.colors.primary.hex};
  margin: 0 1rem;
  cursor: pointer;

  :hover {
    font-weight: bold;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  width: 4rem;
  align-items: center;
  background: none;
  border: none;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: none;
    }
  `}
`;
