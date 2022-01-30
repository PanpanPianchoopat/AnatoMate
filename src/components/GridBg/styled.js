import styled from "styled-components";
import COLORS from "../../../public/constants/colors";
import { AiFillLeftCircle } from "react-icons/ai";

export const Grid = styled.div`
  width: 100%;
  height: 100vh;
  background: ${COLORS.DARK_PURPLE};
  display: flex;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3) 0.1em,
      transparent 0.1em
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0.1em, transparent 0.1em);
  background-size: 3em 3em;
  font-family: "Montserrat", sans-serif;
`;

export const BackHome = styled.div`
  display: flex;
  width: fit-content;
  position: fixed;
  top: 20px;
  left: 20px;
  font-weight: bold;
  font-size: 1.2em;
  color: white;
  align-items: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const BackIcon = styled(AiFillLeftCircle)`
  font-size: 1.5em;
  margin-right: 10px;
`;
