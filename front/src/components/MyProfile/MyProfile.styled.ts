import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const ProfileArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      flex-direction: row;
      margin-bottom: 2rem;
    }
  `}
`;

export const ProfileImageArea = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 10rem;
      margin-right: 1rem;
    }
  `}
`;

export const ProfileImageDiv = styled.div`
  width: 12.5rem;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 50%;
  overflow: hidden;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      margin-bottom: 0;
    }
  `}
`;

export const ProfileImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const ProfileInfoArea = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      padding: 0;
      width: 70%;
    }
  `}
`;

export const ProfileInfoBox = styled.div`
  width: 100%;
  max-width: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  margin: 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 0.25rem;
  overflow: hidden;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 90%;
      margin: 0.75rem 0;
    }
  `}
`;

export const ProfileInfoLabel = styled.label`
  width: 5rem;
  text-align: center;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.primary.hex};
  color: white;
`;

export const ProfileInfoP = styled.p`
  width: 70%;
  background: white;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.primary.hex};
`;

export const ProfileInfoInput = styled.input`
  width: 70%;
  height: 1rem;
  background: white;
  padding: 0 1rem;
  padding-bottom: 1px;
  display: flex;
  border: none;
  color: ${({ theme }) => theme.colors.primary.hex};
  font-size: 1rem;

  :focus {
    outline: none;
  }
`;

export const ProfileButtonArea = styled.div`
  display: flex;
  justify-content: center;
`;

interface ColoredType {
  blank?: boolean;
}

export const ProfileButton = styled.button<ColoredType>`
  margin: 0 0.25rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary.hex};
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 0.25rem;
  color: white;
  font-size: 1.125rem;
  cursor: pointer;

  ${({ blank }) =>
    blank &&
    css`
      background: white;
      color: ${({ theme }) => theme.colors.primary.hex};
    `}
`;
