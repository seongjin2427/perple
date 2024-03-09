import styled, { css } from 'styled-components';

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

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

  border: 2px solid ${({ theme }) => theme.colors.primary.hex};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary.hex};

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary.hex};
  }
`;

export const SearchButton = styled.button`
  width: 5rem;
  height: 2.75rem;
  background: ${({ theme }) => theme.colors.primary.hex};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => `rgba(${theme.colors.primary.rgb}, 0.8)`};
  }
  &:active {
    background: ${({ theme }) => theme.colors.primary.hex};
  }
`;
