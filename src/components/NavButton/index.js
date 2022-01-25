import React from "react";
import { useRouter } from "next/router";
import { ButtonGroup, StyledNavButton } from "./styled";

const NavButton = () => {
  const router = useRouter();
  return (
    <ButtonGroup>
      <StyledNavButton onClick={() => router.push("/login")}>
        Login
      </StyledNavButton>
      <StyledNavButton onClick={() => router.push("/register")} type="dark">
        Sign Up
      </StyledNavButton>
    </ButtonGroup>
  );
};

export default NavButton;
