import styled from "styled-components";

export const Footer = styled.div`
  position: absolute;
  bottom: 25px;
  // background: pink;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  font-size: 0.8em;
  color: black;
`;

export const LicenseLink = styled.p`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
