import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      flex-direction: row;
      margin-top: 1rem;
    }
  `}
`;

export const SideNavigationDiv = styled.div`
  width: 100%;
  height: 2.75rem;
  margin-bottom: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 0.5rem;
  overflow: hidden;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 12.5rem;
      height: 100%;
      border-radius: 1rem;
      margin-right: 2.5rem;
    }
  `}
`;

export const SideNavigation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: block;
    }
  `}
`;

export const SideNaviTitle = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.hex};
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  cursor: pointer;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 100%;
      height: 4.5rem;
      font-size: 1.5rem;
    }
  `}
`;

export const SideNaviMenuDiv = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`;

export const SideNaviMenuUl = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      display: block;
      width: 100%;
      padding: 1.25rem 0;
    }
  `}
`;

export const SideNaviMenuLi = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.primary.hex};
  font-size: 0.75rem;

  :hover {
    font-weight: bold;
  }

  ${({ theme }) => css`
    ${theme.media.tablet} {
      padding: 1.25rem 0;
      font-size: 1.125rem;
    }
  `}
`;

export const MainBox = styled.div`
  /* display: none; */
  width: 100%;
  height: 100%;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      width: 40rem;
    }
  `}
`;
