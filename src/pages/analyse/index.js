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
  const [isModelReady, setIsModelReady] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // character's height
  const [customHeight, setCustomHeight] = useState(0);
  useEffect(() => {
    console.log("CUSTOM_HEIGHT", customHeight);
  }, [customHeight]);

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>AnatoMate</Header>
        <SectionsContainer>
          <HowTo
            customHeight={customHeight}
            setCustomHeight={setCustomHeight}
            showModel={showModel}
          />
          <PictureProcessing
            customHeight={customHeight}
            setCustomHeight={setCustomHeight}
            showModel={showModel}
            isReset={isReset}
            setIsReset={setIsReset}
          />
          <Suggestions
            showModel={showModel}
            setShowModel={setShowModel}
            isReset={isReset}
            setIsReset={setIsReset}
            // isModelReady={isModelReady}
            // setIsModelReady={setIsModelReady}
          />
        </SectionsContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Analyse;
