import styled from "styled-components";

export const LayerContainer = styled.div`
  background: #febbab;
  width: 45%;
  height: 60vh;
  margin: auto;
  border: 3px solid black;
  overflow: visible;
`;

export const StyledFormContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fcf9f4;
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  margin: -15px;
  overflow: hidden;
  font-family: Montserrat;
`;

export const FormContent = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 5%;
  font-size: 1em;
`;

export const FormHeader = styled.h1`
  align-self: center;
`;

export default StyledFormContainer;
