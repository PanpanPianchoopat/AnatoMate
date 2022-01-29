import styled from "styled-components";
import COLORS from "../../../public/constants/colors";

export const StyledButton = styled.button.attrs((props) => {
  const bgColor = props.color === "transparent" ? "none" : COLORS.SALMON;
  return { bgColor };
})`
  background: ${(props) => props.bgColor};
  width: fit-content;
  border: 3px solid ${COLORS.DEFALT_BLACK};
  color: ${COLORS.DEFALT_BLACK};
  font-size: 1em;
  padding: 5px 30px;
  &:hover {
    background: ${COLORS.DEFALT_BLACK};
    color: white;
    cursor: pointer;
  }
`;

export default StyledButton;
