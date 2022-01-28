import React from "react";
import {
  StyledFormContainer,
  LayerContainer,
  FormHeader,
  FormContent,
} from "./styled";

const FormContainer = ({ children }) => {
  return (
    <LayerContainer>
      <StyledFormContainer>
        <FormHeader>AnatoMate</FormHeader>
        <FormContent>{children}</FormContent>
      </StyledFormContainer>
    </LayerContainer>
  );
};

export default FormContainer;
