import { Select } from "antd";
import styled from "styled-components";

export const SelectInput = styled(Select)`
  border: 2px solid black;
  border-radius: none;
  width: 30px;
  height: 40px;
  display: inline-block;
  .ant-select-selector {
    width: 30px;
  }
`;
