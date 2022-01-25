import styled from "styled-components";

export const PictureContainer = styled.div`
  width: 500px;
  height: 500px;
  border: 3px solid black;
  display: flex;
  text-align: center;
  align-items: center;
  margin: 3px 0;
  position: relative;
`;
export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
  cursor: pointer;
  position: absolute;
`;
