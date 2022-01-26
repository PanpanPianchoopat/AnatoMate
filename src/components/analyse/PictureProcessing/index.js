import React, { useState, useRef, useEffect } from "react";
import { Upload, Switch } from "antd";
import { PictureContainer, UploadedImage } from "./styled";

import Pose from "../Pose";
import Model from "../Model";

const PictureProcessing = () => {
  const [picture, setPicture] = useState(null);
  const [finishUpload, setFinishUpload] = useState(false);
  const imgRef = useRef();
  const handleChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPicture(reader.result);
        setFinishUpload(true);
        setShowPoints(true);
      });
      reader.readAsDataURL(info.file.originFileObj);
    }
  };
  const handleNewUpload = () => {
    setPicture(null);
    setFinishUpload(false);
    setShowPoints(false);
    setShowModel(false);
  };

  // const handleShowModel = (value) => {
  //   setShowModel(value);
  //   setShowPoints(false);
  // };

  const [showPoints, setShowPoints] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [modelKeypoints, setModelKeypoints] = useState(null);
  useEffect(() => {
    console.log("KEYPOINTS", modelKeypoints);
  }, [modelKeypoints]);
  return (
    <>
      <PictureContainer>
        {!finishUpload && (
          <Upload
            listType="picture-card"
            defaultFileList={picture}
            showUploadList={false}
            onChange={(info) => handleChange(info)}
            maxCount={1}
          >
            +<br />
            Upload Photo
          </Upload>
        )}
        {picture && (
          <UploadedImage
            id="picture"
            crossOrigin="annonymous"
            ref={imgRef}
            src={picture}
            onClick={handleNewUpload}
          />
        )}
        {showPoints && (
          <Pose
            finishProcess={finishUpload}
            setModelKeypoints={setModelKeypoints}
          />
        )}
        {showModel && <Model keypoints={modelKeypoints} />}
      </PictureContainer>
      <button onClick={handleNewUpload}>Reset Image</button>
      {/* <Switch
        checked={showModel}
        onChange={(value) => handleShowModel(value)}
      /> */}
      <Switch checked={showModel} onChange={(value) => setShowModel(value)} />
    </>
  );
};

export default PictureProcessing;
