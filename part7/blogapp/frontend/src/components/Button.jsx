import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  color: #c70039;
  border: 2px solid #c70039;
  border-radius: 8px;
  background-color: white;
  font-weight: bold;
  padding: 0.5em 0.75em;
  text-transform: uppercase;

  &:hover {
    background-color: #c70039;
    color: white;
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
