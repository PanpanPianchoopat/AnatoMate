import React, { useState, useRef } from "react";
import { Upload } from "antd";
import { PictureContainer, UploadedImage } from "./styled";

import Pose from "../Pose";

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
  };

  const [showPoints, setShowPoints] = useState(false);

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
        {showPoints && <Pose finishProcess={finishUpload} />}
      </PictureContainer>
      <button onClick={handleNewUpload}>Reset Image</button>
    </>
  );
};

export default PictureProcessing;
