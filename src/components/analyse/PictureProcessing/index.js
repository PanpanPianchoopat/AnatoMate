import React, { useState, useRef } from "react";
import { Upload } from "antd";
import { PictureContainer, UploadedImage } from "./styled";

const PictureProcessing = () => {
  const [picture, setPicture] = useState(null);
  const [finishUpload, setFinishUpload] = useState(false);
  const imgRef = useRef();
  const handleChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.addEventListener("load", () => setPicture(reader.result));
      reader.readAsDataURL(info.file.originFileObj);
      setFinishUpload(true);
    }
  };
  const handleNewUpload = () => {
    setPicture(null);
    setFinishUpload(false);
  };

  return (
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
          ref={imgRef}
          src={picture}
          onClick={handleNewUpload}
        />
      )}
    </PictureContainer>
  );
};

export default PictureProcessing;
