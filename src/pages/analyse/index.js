import React, { useState, useRef, useEffect } from "react";
import {
  PageContainer,
  ContentWrapper,
  SectionsContainer,
  Header,
} from "./styled";
import PictureProcessing from "./components/PictureProcessing";
import HowTo from "./components/HowTo";
import Suggestions from "./components/Suggestions";

const Analyse = () => {
  const [showModel, setShowModel] = useState(false);
  const [isReset, setIsReset] = useState(false);

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>AnatoMate</Header>
        <SectionsContainer>
          <HowTo />
          <PictureProcessing
            showModel={showModel}
            isReset={isReset}
            setIsReset={setIsReset}
          />
          <Suggestions
            showModel={showModel}
            setShowModel={setShowModel}
            isReset={isReset}
            setIsReset={setIsReset}
          />
        </SectionsContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Analyse;
