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
  const [suggestions, setSuggestions] = useState([]);
  const [modelSkin, setModelSkin] = useState("transparent");

  // character's height
  const [customHeight, setCustomHeight] = useState(0);
  useEffect(() => {
    console.log("SUGGESTION", suggestions);
  }, [suggestions]);

  useEffect(() => {
    if (isReset) {
      setSuggestions([]);
      setShowModel(false);
    }
  }, [isReset]);

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
            modelSkin={modelSkin}
            isReset={isReset}
            setIsReset={setIsReset}
            setSuggestions={setSuggestions}
          />
          <Suggestions
            showModel={showModel}
            setShowModel={setShowModel}
            modelSkin={modelSkin}
            setModelSkin={setModelSkin}
            isReset={isReset}
            setIsReset={setIsReset}
            suggestions={suggestions}
          />
        </SectionsContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Analyse;
