import React, { useState, useEffect } from "react";
import {
  PageContainer,
  ContentWrapper,
  SectionsContainer,
  Header,
} from "./styled";
import PictureProcessing from "./components/PictureProcessing";
import HowTo from "./components/HowTo";
import Suggestions from "./components/Suggestions";
import { SectionHeader, SectionUnderline } from "./components/HowTo/styled";
import { SuggestionsWrapper } from "./components/Suggestions/styled";
import { useRouter } from "next/router";

const Analyse = () => {
  const [showPoints, setShowPoints] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [modelSkin, setModelSkin] = useState("transparent");

  const [isResetImg, setIsResetImg] = useState(false); // reset image button

  const [customHeight, setCustomHeight] = useState({}); // preferences of height
  const [charHeight, setCharHeight] = useState(0); // character's height

  const [isModelReady, setIsModelReady] = useState(false); // set to true when get all keypoints from pose processing

  const router = useRouter();

  useEffect(() => {
    console.log("SUGGESTION", suggestions);
  }, [suggestions]);

  useEffect(() => {
    console.log("IS MODEL READY", isModelReady);
  }, [isModelReady]);

  return (
    <PageContainer>
      <ContentWrapper>
        <Header onClick={() => router.push("/")}>AnatoMate</Header>
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
              <SectionUnderline />
              <p>Nothing to suggest. Please upload your photo.</p>
            </SuggestionsWrapper>
          )}
        </SectionsContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Analyse;
