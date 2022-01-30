import React, { useState, useRef, useEffect } from "react";
import { Upload, Switch } from "antd";
import { PictureContainer, UploadedImage } from "./styled";
import ImgCrop from "antd-img-crop";

import Pose from "./components/Pose";
import Model from "./components/Model";

const PictureProcessing = ({ ...props }) => {
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
  useEffect(() => {
    if (props) {
      if (props.isReset) {
        setPicture(null);
        setFinishUpload(false);
        setShowPoints(false);
        setShowModel(false);
        props.setIsReset(false);
      }
    }
  }, [props]);

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
          <ImgCrop quality={1} rotate={true} grid={true}>
            <Upload
              listType="picture-card"
              defaultFileList={picture}
              showUploadList={false}
              onChange={(info) => handleChange(info)}
              maxCount={1}
            >
              Upload
              <br />
              Photo
            </Upload>
          </ImgCrop>
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
        {props && props.showModel && (
          <Model
            keypoints={modelKeypoints}
            customHeight={props.customHeight}
            setCustomHeight={props.setCustomHeight}
            setSuggestions={props.setSuggestions}
            modelSkin={props.modelSkin}
            setCharHeight={props.setCharHeight}
          />
        )}
      </PictureContainer>
    </>
  );
};

export default PictureProcessing;
