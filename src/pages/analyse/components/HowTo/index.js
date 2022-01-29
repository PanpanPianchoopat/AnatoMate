import React, { useEffect, useState } from "react";
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
  const [disabled, setDisabled] = useState(false);
  const [unit, setUnit] = useState("unit");
  const logChage = (val) => {
    console.log(val);
  };

  const [form] = Form.useForm();
  const resetForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    document.getElementById("apply-button").disabled = disabled;
  }, [disabled]);

  return (
    <SectionWrapper>
      <SectionHeader>How To</SectionHeader>
      <SectionUnderline />
      <Instruction>
        1. Upload photo
        <br />
        2. Manually adjust the point for each limb
        <br />
        3. Click “Comparison” to let the system show the correct anatomy <br />
        4. Then you can improve your drawing from our suggestion
      </Instruction>

      <SectionHeader>Preference</SectionHeader>
      <SectionUnderline />
      <Form
        form={form}
        size="medium"
        layout="vertical"
        initialValues={{
          ratio_unit: 1,
          ratio_px: 1,
        }}
        onFinish={logChage}
        style={{ marginRight: "15px" }}
      >
        <Form.Item label="Character's height" style={{ marginBottom: "15px" }}>
          <Form.Item name="char_height" noStyle>
            <InputNumber
              min={1}
              placeholder="height"
              style={{
                border: "2px solid black",
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            />
          </Form.Item>
          <Form.Item name="height_unit" noStyle>
            <Select
              placeholder="unit"
              onChange={(unit) => setUnit(unit)}
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
        <Form.Item label={`Ratio ${unit} : px`}>
          <Form.Item name="ratio_unit" noStyle>
            <InputNumber
              min={1}
              placeholder="unit"
              style={{
                border: "2px solid black",
                display: "inline-block",
                width: "calc(50% - 4px)",
              }}
            />
          </Form.Item>
          <Form.Item name="ratio_px" noStyle>
            <InputNumber
              min={1}
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
            <Button color="transparent" type="reset" onClick={resetForm}>
              Reset
            </Button>
            <Button
              type="submit"
              id="apply-button"
              style={{
                marginLeft: "10px",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              Apply
            </Button>
          </ButtonGroup>
        </Form.Item>
      </Form>
    </SectionWrapper>
  );
};

export default HowTo;
