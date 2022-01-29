import React, { useState, useRef, useEffect } from "react";
import { PageContainer, SectionsContainer, Header } from "./styled";
import PictureProcessing from "../../components/Analyse/PictureProcessing";
import HowTo from "./components/HowTo";
import Suggestions from "./components/Suggestions";
import NavButton from "../../components/NavButton";

const Analyse = () => {
  const [showModel, setShowModel] = useState(false);
  useEffect(() => {
    console.log("SHOW", showModel);
  }, [showModel]);

  return (
    <PageContainer>
      <Header>AnatoMate</Header>
      <SectionsContainer>
        <HowTo />
        <PictureProcessing showModel={showModel} />
        <Suggestions showModel={showModel} setShowModel={setShowModel} />
      </SectionsContainer>
    </PageContainer>
  );
};

export default Analyse;
