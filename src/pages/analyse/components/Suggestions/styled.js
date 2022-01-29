import styled from "styled-components";
import { AiOutlineSmile } from "react-icons/ai";

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
