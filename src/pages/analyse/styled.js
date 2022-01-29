import styled from "styled-components";
import COLORS from "../../../public/constants/colors";
import DEFAULT_FONT from "../../../public/constants/fonts";

export const PageContainer = styled.div`
  background: ${COLORS.CREAM};
  width: 100%;
  height: 100vh;
  border: 25px solid ${COLORS.DARK_PURPLE};
  padding: 20px 5vw;
  font-family: ${DEFAULT_FONT};
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-width: 1024px;
  max-width: 1920px;
`;

export const Header = styled.h1`
  color: ${COLORS.DARK_PURPLE};
  font-size: 2em;
  padding-bottom: 20px;
`;
export const SectionsContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  justify-content: space-between;
  margin-top: 30px;
`;
