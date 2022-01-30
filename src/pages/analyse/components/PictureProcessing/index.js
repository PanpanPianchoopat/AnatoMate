import React, { useState, useRef, useEffect } from "react";
import { Upload } from "antd";
import { PictureContainer, UploadedImage } from "./styled";
import ImgCrop from "antd-img-crop";

import Pose from "./components/Pose";
import Model from "./components/Model";

const PictureProcessing = ({ ...props }) => {
  // const [showPoints, setShowPoints] = useState(false);
  const [picture, setPicture] = useState(null);
  const [finishUpload, setFinishUpload] = useState(false);
  const imgRef = useRef();
  const handleChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPicture(reader.result);
        setFinishUpload(true);
        props.setShowPoints(true);
      });
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  useEffect(() => {
    if (props) {
      if (props.isResetImg) {
        setPicture(null);
        setFinishUpload(false);
        props.setShowPoints(false);
        props.setIsModelReady(false);
        props.setIsResetImg(false);
      }
    }
  }, [props]);

  const [modelKeypoints, setModelKeypoints] = useState(null);

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
          />
        )}
        {props.showPoints && (
          <Pose
            finishProcess={finishUpload}
            originalKeypoints={props.originalKeypoints}
            setOriginalKeypoints={props.setOriginalKeypoints}
            setModelKeypoints={setModelKeypoints}
            setIsModelReady={props.setIsModelReady}
            setIsResetImg={props.setIsResetImg}
          />
        )}
        {props && props.showModel && (
          <Model
            keypoints={modelKeypoints}
            customHeight={props.customHeight}
            setCharHeight={props.setCharHeight}
            setSuggestions={props.setSuggestions}
            modelSkin={props.modelSkin}
          />
        )}
      </PictureContainer>
    </>
  );
};

export default PictureProcessing;
