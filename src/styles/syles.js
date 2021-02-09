import styled from 'styled-components';

export const Box = styled.div`
  background-color: red;
  padding: 20px 10px;
  &:hover {
    background-color: blue;
  }
  color: ${props => props.flex ? '#000' : '#fff'}
`