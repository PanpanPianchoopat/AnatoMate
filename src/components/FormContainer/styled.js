import styled from "styled-components";

export const LayerContainer = styled.div`
  background: #febbab;
  width: 45%;
  max-width: 500px;
  min-width: 350px;
  height: 60vh;
  margin: auto;
  border: 3px solid black;
  overflow: visible;
  font-family: Montserrat;
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
  padding: 10px;
`;

export const FormContent = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 5%;
  font-size: 1em;
  overflow-y: auto;
`;

export const FormHeader = styled.h1`
  align-self: center;
  font-weight: bold;
`;

export default StyledFormContainer;
