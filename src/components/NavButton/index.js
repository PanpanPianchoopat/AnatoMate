import React from "react";
import { ButtonGroup, StyledNavButton } from "./styled";
import { useRouter } from "next/router";

const NavButton = () => {
  const router = useRouter();
  return (
    <ButtonGroup>
      <StyledNavButton onClick={() => router.push("/login")}>
        Login
      </StyledNavButton>
      <StyledNavButton type="dark" onClick={() => router.push("/signup")}>
        Sign Up
      </StyledNavButton>
    </ButtonGroup>
  );
};

export default NavButton;
