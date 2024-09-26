import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../utils";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import LoupeIcon from "@mui/icons-material/Loupe";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../utils/logout";

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authenticated") !== "true") {
      navigate("/");
    }
  }, []);
  return (
    <Container style={{ backgroundColor: colors.main }}>
      <Header style={{ color: colors.main }}>
        <PetsIcon />
        <LogoutIcon onClick={logout} />
      </Header>
      <Content>{children}</Content>
      <Footer style={{ color: colors.main }}>
        <DynamicFeedIcon />
        <SearchIcon />
        <LoupeIcon />
        <AccountCircleIcon />
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px 0 70px 0;
`;

const Content = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const Header = styled.header`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background-color: aliceblue;
`;

const Footer = styled.footer`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background-color: aliceblue;
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

export default Dashboard;
