import styled from "styled-components";

export const Canva = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
`;

export const Tooltip = styled.div`
  position: absolute;
  background-color: lightgoldenrodyellow;
  border: 1px solid black;
  padding: 1px 3px;
  top: 5px;
  right: 5px;
  animation: pop 0.2s ease-out 1;
`;
