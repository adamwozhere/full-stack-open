import { Link } from 'react-router-dom';
import Button from './Button';

import styled from 'styled-components';

const NavContainer = styled.div`
  background: #f1efda;
  padding: 1.5rem 2rem;
  font: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #581845;
`;

const StyledLink = styled(Link)`
  color: #c70039;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const NavMenu = ({ user, logout }) => {
  return (
    <NavContainer>
      <StyledLink to="/">Blogs</StyledLink>
      <StyledLink to="/users">Users</StyledLink>
      {user ? (
        <span>
          Logged in as <BoldText>{user.name}</BoldText> &nbsp;
          <Button onClick={() => logout()}>logout</Button>
        </span>
      ) : null}
    </NavContainer>
  );
};

export default NavMenu;
