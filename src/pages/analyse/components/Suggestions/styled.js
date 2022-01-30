import styled from "styled-components";
import { AiOutlineSmile } from "react-icons/ai";
import COLORS from "../../../../../public/constants/colors";

export const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid black;
`;

export const OptionButton = styled.div.attrs((props) => {
  const bgColor = props.isActive ? COLORS.SALMON : "none";
  return { bgColor };
})`
  display: flex;
  border: 1px solid black;
  background: ${(props) => props.bgColor};
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`;

export const SuggestionsWrapper = styled.div`
  width: calc(50% - 255px);
  height: 100%;
  padding-left: 20px;
  font-size: 1em;
  display: flex;
  flex-direction: column;
`;

export const NoComment = styled.div`
  display: flex;
  align-self: center;
  margin-top: 30px;
  align-items: center;
  font-size: 1em;
`;

export const Smiley = styled(AiOutlineSmile)`
  font-size: 1.3em;
  margin-left: 5px;
`;
