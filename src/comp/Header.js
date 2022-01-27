import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const { saveUser } = useContext(AuthContext);

  return (
    <div>
      <Container>
        <Wrapper>
          <Logo to="/">Logo</Logo>

          <Navigation>
            {saveUser ? (
              <Nav
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Log Out
              </Nav>
            ) : (
              <div>
                {" "}
                <Button to="/sign">Login</Button>
                <Button to="/register">Register</Button>
              </div>
            )}
          </Navigation>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Header;

const Nav = styled.div`
  padding: 15px 40px;
  background: red;
  color: white;
  margin: 0 10px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 15px 40px;
  background: white;
  color: black;
  margin: 0 10px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Navigation = styled.div`
  margin: 0px 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 0px 20px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background: #004080;
  color: white;
`;
