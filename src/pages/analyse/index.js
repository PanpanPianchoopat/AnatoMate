import React, { useState, useRef } from "react";
import Container from "../../components/Container";
import { SectionsContainer } from "./styled";
import PictureProcessing from "../../components/Analyse/PictureProcessing";

const Analyse = () => {
  const imgRef = useRef();
  return (
    <Container>
      <h1>AnatoMate</h1>
      <SectionsContainer>
        <div>Howto</div>

        <PictureProcessing />

        <div>comments</div>
      </SectionsContainer>
    </Container>
  );
};

export default Analyse;
