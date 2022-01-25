import React from "react";
import COLORS from "../../../public/constants/colors";
import { ButtonGroup, StyledNavButton } from "./styled";

const NavButton = () => {
  return (
    <ButtonGroup>
      <StyledNavButton>Login</StyledNavButton>
      <StyledNavButton type="dark">Sign Up</StyledNavButton>
    </ButtonGroup>
  );
};

export default NavButton;
