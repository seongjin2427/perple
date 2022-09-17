import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 2rem 5rem 2rem;
`;

export const PrevNextButton = styled.div`
  width: 5rem;
  margin: 0 3rem;
  :hover {
    cursor: pointer;
  }
  svg {
    width: 5rem;
  }
`;
