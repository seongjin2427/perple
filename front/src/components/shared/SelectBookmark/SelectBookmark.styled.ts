import styled, { css } from 'styled-components';

export const Container = styled.div`
  min-width: 15rem;
  width: 70vw;
  max-width: 50rem;
`;

export const BookmarkWrapper = styled.div`
  width: 100%;
  height: 15rem;
  padding: 0.5rem 0 0 0;
  margin: 1rem 0;
  overflow: scroll;
`;

export const BlankBookmark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary.hex};
`;

export const BookmarkLabel = styled.label`
  display: flex;
  background: white;
  color: ${({ theme }) => theme.colors.primary.hex};
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  cursor: pointer;

  :hover {
    background: rgb(${({ theme }) => theme.colors.thirdary.rgb}, 0.8);
  }
`;

export const BookmarkCheckbox = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.colors.secondary.hex};
  }
`;

export const Title = styled.p`
  font-size: 1.125rem;
`;
export const ConfirmButton = styled.button`
  width: 100%;
  padding: 1rem;
  cursor: pointer;

  font-size: 1.25rem;
  ${({ theme }) => css`
    color: white;
    border: none;
    background: ${theme.colors.primary.hex};

    :hover {
      background: rgba(${theme.colors.primary.rgb}, 0.8);
    }
    :active {
      background: ${theme.colors.primary.hex};
    }
  `}
`;

interface ModifyModeType {
  modifyMode: boolean;
}

export const CreateBookmarkDiv = styled.div<ModifyModeType>`
  display: flex;
  background: white;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  cursor: pointer;

  :hover {
    background: rgb(${({ theme }) => theme.colors.thirdary.rgb}, 0.8);
  }

  * {
    color: ${({ theme }) => theme.colors.primary.hex};
  }
`;

export const CreateBookmarkParagraph = styled.p``;

export const CreateBookmarkInput = styled.input`
  border: 0;
  background: red;
`;

export const CreateBookmarkButtonDiv = styled.div``;

export const CreatBookmarkButton = styled.button`
  background: none;
  border: none;
`;
