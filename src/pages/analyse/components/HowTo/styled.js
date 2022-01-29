import styled from "styled-components";

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 255px);
  padding-right: 10px;
  line-height: 25px;
`;

export const SectionHeader = styled.h2`
  font-weight: bold;
`;

export const SectionUnderline = styled.div`
  width: 50px;
  height: 3px;
  background: black;
  margin-bottom: 20px;
`;

export const Instruction = styled.p`
  text-align: justify;
  margin-right: 15px;
  margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
