import styled from 'styled-components';

export const Container = styled.div`
  width: 15rem;
  height: 100%;
  color: ${({ theme }) => theme.colors.primary.hex};
  border-radius: 1rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.hex};
  }
`;

export const GoogleLoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary.hex};
  border-radius: 1rem;
`;

export const GoogleIcon = styled.div`
  width: 1.75rem;
  margin-right: 0.5rem;
`;

export const GoogleIconImg = styled.img`
  width: 100%;
`;

export const GoogleIconText = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
`;
