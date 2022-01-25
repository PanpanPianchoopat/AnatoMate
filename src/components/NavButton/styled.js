import styled from "styled-components";
import COLORS from "../../../public/constants/colors";

export const ButtonGroup = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background: yellow;
  display: flex;
`;

export const StyledNavButton = styled.div.attrs((props) => {
  const bgColor = props.type === "dark" ? COLORS.DARK_PURPLE : COLORS.SALMON;
  const textColor = props.type === "dark" ? "white" : COLORS.DARK_PURPLE;
  return { bgColor, textColor };
})`
  border: 3px solid ${COLORS.DARK_PURPLE};
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  background: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  &:hover {
    background: ${COLORS.DEFALT_BLACK};
    border: 3px solid ${COLORS.DEFALT_BLACK};
    color: white;
    cursor: pointer;
  }
`;

export default ButtonGroup;
