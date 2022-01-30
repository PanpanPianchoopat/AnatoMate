import React, { useState, useRef, useEffect } from "react";
import {
  PageContainer,
  ContentWrapper,
  SectionsContainer,
  Header,
  EmptySuggest,
} from "./styled";
import PictureProcessing from "./components/PictureProcessing";
import HowTo from "./components/HowTo";
import Suggestions from "./components/Suggestions";
import { SectionHeader } from "./components/HowTo/styled";
import { SuggestionsWrapper } from "./components/Suggestions/styled";

const Analyse = () => {
  const [showPoints, setShowPoints] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [modelSkin, setModelSkin] = useState("transparent");

  // reset image button
  const [isResetImg, setIsResetImg] = useState(false);

  // preferences of height
  const [customHeight, setCustomHeight] = useState({});

  // character's height
  const [charHeight, setCharHeight] = useState(0);

  // set to true when get all keypoints from pose processing
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    console.log("SUGGESTION", suggestions);
  }, [suggestions]);

  useEffect(() => {
    console.log("IS MODEL READY", isModelReady);
  }, [isModelReady]);

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>AnatoMate</Header>
        <SectionsContainer>
          <HowTo
            customHeight={customHeight}
            setCustomHeight={setCustomHeight}
            charHeight={charHeight}
            showModel={showModel}
            isResetImg={isResetImg}
          />
          <PictureProcessing
            showPoints={showPoints}
            setShowPoints={setShowPoints}
            setIsModelReady={setIsModelReady}
            customHeight={customHeight}
            setCharHeight={setCharHeight}
            showModel={showModel}
            modelSkin={modelSkin}
            isResetImg={isResetImg}
            setIsResetImg={setIsResetImg}
            setSuggestions={setSuggestions}
          />
          {isModelReady ? (
            <Suggestions
              showModel={showModel}
              setShowModel={setShowModel}
              setShowPoints={setShowPoints}
              modelSkin={modelSkin}
              setModelSkin={setModelSkin}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              isResetImg={isResetImg}
              setIsResetImg={setIsResetImg}
            />
          ) : (
            <SuggestionsWrapper>
              <SectionHeader>Suggestions</SectionHeader>
              <p>Nothing to suggest. Plase upload your photo.</p>
            </SuggestionsWrapper>
          )}
        </SectionsContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Analyse;
