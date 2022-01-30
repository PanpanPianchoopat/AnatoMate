import styled from "styled-components";
import COLORS from "../../../public/constants/colors";

export const StyledButton = styled.button.attrs((props) => {
  const isTransparent = props.color === "transparent";
  const isDisabled = props.disable;
  const bgColor = isDisabled || isTransparent ? "none" : COLORS.SALMON;
  return { isDisabled, bgColor };
})`
  background: ${(props) => props.bgColor};
  width: fit-content;
  border: 3px solid
    ${(props) => (props.isDisabled ? COLORS.GREY : COLORS.DEFALT_BLACK)};
  color: ${(props) => (props.isDisabled ? COLORS.GREY : COLORS.DEFALT_BLACK)};
  font-size: 1em;
  padding: 5px 30px;
  &:hover {
    background: ${(props) => (props.isDisabled ? "none" : COLORS.DEFALT_BLACK)};
    color: ${(props) => (props.isDisabled ? COLORS.GREY : "white")};
    cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  }
`;

export default StyledButton;
