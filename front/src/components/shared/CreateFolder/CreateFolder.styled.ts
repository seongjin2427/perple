import styled, { css } from 'styled-components';

interface ModifyModeType {
  modifyMode: boolean;
}

export const CreateBookmarkDiv = styled.div<ModifyModeType>`
  display: flex;
  background: white;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  cursor: pointer;

  ${({ modifyMode }) =>
    !modifyMode &&
    css`
      &:hover {
        background: rgb(${({ theme }) => theme.colors.thirdary.rgb}, 0.8);
      }
    `}

  * {
    color: ${({ theme }) => theme.colors.primary.hex};
  }
`;

export const CreateBookmarkParagraph = styled.p`
  padding: 0.25rem 0;
`;

export const CreateBookmarkInput = styled.input`
  width: 70%;
  height: 1.5rem;
  border: 0;
  font-size: 1rem;

  &::placeholder {
    color: ${({ theme }) => `rgba(${theme.colors.primary.rgb}, 0.4)`};
  }
  &:focus {
    outline: none;
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      font-size: 1.125rem;
    }
  `}
`;

export const CreateBookmarkButtonDiv = styled.div``;

export const CreatBookmarkButton = styled.button`
  padding: 0.25rem 0.25rem;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.hex};
    color: white;
    border-radius: 0.25rem;
    ${({ theme }) => css`
      ${theme.media.tablet} {
        font-size: 1rem;
      }
    `}
  }
`;
