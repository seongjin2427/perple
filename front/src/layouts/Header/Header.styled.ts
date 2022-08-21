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
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  ${({ theme }) => css`
    ${theme.media.desktop} {
      justify-content: flex-end;
      flex: 5;
    }
  `}
`;

export const SearchInput = styled.input`
  width: 70%;
  height: 2.5rem;
  font-size: 1rem;
  padding: 0 0.75rem;
  color: ${({ theme }) => theme.colors.primary.hex};
  border: 2px solid ${({ theme }) => theme.colors.secondary.hex};
  :focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary.hex};
  }
`;

export const SearchButton = styled.button`
  width: 3rem;
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

export const HeaderMenuDiv = styled.div`
  display: none;
  flex: 3;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

export const HeaderMenuUl = styled.ul`
  display: flex;
`;

export const HeaderMenuLi = styled.li`
  color: ${({ theme }) => theme.colors.primary.hex};
  margin: 0 1vw;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;

export const MenuButton = styled.button`
  display: block;
  width: 3rem;
  background: lightpink;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: none;
    }
  `}
`;
