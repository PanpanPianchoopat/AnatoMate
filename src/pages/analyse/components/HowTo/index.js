import React from "react";
import { Form, InputNumber, Radio, Input, Select } from "antd";
import {
  SectionWrapper,
  SectionHeader,
  SectionUnderline,
  Instruction,
  ButtonGroup,
} from "./styled";
import Button from "../../../../components/Button";

const HowTo = () => {
  const logChage = (val) => {
    console.log(val);
  };
  return (
    <SectionWrapper>
      <SectionHeader>How To</SectionHeader>
      <SectionUnderline />
      <Instruction>
        1. Upload photo
        <br />
        2. Manually adjust the point for each limb
        <br />
        3. Click “Analyze” to let the system check your anatomy <br />
        4. Then you can improve your drawing from our suggestion
      </Instruction>
      <SectionHeader>Preference</SectionHeader>
      <SectionUnderline />
      <Form
        size="medium"
        layout="vertical"
        onFinish={logChage}
        style={{ marginRight: "15px" }}
      >
        <Form.Item label="Character's height" style={{ marginBottom: "15px" }}>
          <Form.Item name="char_height" noStyle>
            <InputNumber
              placeholder="height"
              style={{
                border: "2px solid black",
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            />
          </Form.Item>
          <Form.Item name="unit" noStyle>
            <Select
              placeholder="unit"
              style={{
                border: "2px solid black",
                display: "inline-block",
                width: "calc(50%)",
              }}
            >
              <Select.Option key="1" value="centimeter">
                centimeter
              </Select.Option>
              <Select.Option key="2" value="meter">
                meter
              </Select.Option>
              <Select.Option key="3" value="inch">
                inch
              </Select.Option>
              <Select.Option key="4" value="millimeter">
                millimeter
              </Select.Option>
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Ratio (cm : px)">
          <Form.Item name="cm" noStyle>
            <InputNumber
              placeholder="cm"
              style={{
                border: "2px solid black",
                display: "inline-block",
                width: "calc(50% - 4px)",
              }}
            />
          </Form.Item>
          <Form.Item name="px" noStyle>
            <InputNumber
              placeholder="px"
              style={{
                border: "2px solid black",
                display: "inline-block",
                marginLeft: "8px",
                width: "calc(50% - 4px)",
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <ButtonGroup>
            <Button color="transparent">Reset</Button>
            <Button type="submit" style={{ marginLeft: "10px" }}>
              Apply
            </Button>
          </ButtonGroup>
        </Form.Item>
      </Form>
    </SectionWrapper>
  );
};

export default HowTo;
