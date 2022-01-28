import React, { useState, useRef } from "react";
import { PageContainer, SectionsContainer, Header } from "./styled";
import PictureProcessing from "../../components/Analyse/PictureProcessing";
import HowTo from "./components/HowTo";
import Suggestions from "./components/Suggestions";
import NavButton from "../../components/NavButton";

const Analyse = () => {
  return (
    <PageContainer>
      <Header>AnatoMate</Header>
      <SectionsContainer>
        <HowTo />

        <div
          style={{
            width: "500px",
            height: "500px",
            border: "3px solid black",
            background: "white",
          }}
        >
          image section mock
        </div>

        {/* <PictureProcessing /> */}

        <Suggestions />
      </SectionsContainer>
    </PageContainer>
  );
};

export default Analyse;
