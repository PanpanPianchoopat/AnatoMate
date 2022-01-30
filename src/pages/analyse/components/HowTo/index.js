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
import COLORS from "../../../../../public/constants/colors";

const HowTo = ({ ...props }) => {
  const [disabled, setDisabled] = useState(true);
  const [unit, setUnit] = useState("unit");

  const [form] = Form.useForm();
  const onFinish = (val) => {
    console.log(val);
    // const characterHeight =
    //   props.customHeight *
    //   (form.getFieldValue("ratio_unit") / form.getFieldValue("ratio_px"));
    // console.log("CAL_H", characterHeight);

    // props.setCustomHeight(form.getFieldValue("char_height"));
    console.log(val);
    props.setCustomHeight(val);
  };

  useEffect(() => {
    console.log("RECIEVE_HEGIHT", props.customHeight);
    form.setFieldsValue({ char_height: Math.round(props.customHeight) });
  }, [props.customHeight]);

  const resetForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    document.getElementById("apply-button").disabled = disabled;
    document.getElementById("reset-button").disabled = disabled;
  }, [disabled]);

  useEffect(() => {
    setDisabled(!props.showModel);
  }, [props.showModel]);

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
          char_height: 1,
          ratio_unit: 1,
          ratio_px: 1,
        }}
        onFinish={onFinish}
        style={{ marginRight: "15px" }}
      >
        <Form.Item label="Character's height" style={{ marginBottom: "15px" }}>
          <Form.Item name="char_height" noStyle>
            <InputNumber
              disabled={disabled}
              defaultValue={100}
              placeholder="height"
              style={{
                border: `2px solid ${
                  disabled ? COLORS.GREY : COLORS.DEFALT_BLACK
                }`,
                display: "inline-block",
                width: "calc(50% - 8px)",
                marginRight: "8px",
              }}
            />
          </Form.Item>
          <Form.Item name="height_unit" noStyle>
            <Select
              disabled={disabled}
              placeholder="unit"
              onChange={(unit) => setUnit(unit)}
              style={{
                border: `2px solid ${
                  disabled ? COLORS.GREY : COLORS.DEFALT_BLACK
                }`,
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
              disabled={disabled}
              placeholder="unit"
              style={{
                border: `2px solid ${
                  disabled ? COLORS.GREY : COLORS.DEFALT_BLACK
                }`,
                display: "inline-block",
                width: "calc(50% - 4px)",
              }}
            />
          </Form.Item>
          <Form.Item name="ratio_px" noStyle>
            <InputNumber
              min={1}
              disabled={disabled}
              placeholder="px"
              style={{
                border: `2px solid ${
                  disabled ? COLORS.GREY : COLORS.DEFALT_BLACK
                }`,
                display: "inline-block",
                marginLeft: "8px",
                width: "calc(50% - 4px)",
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <ButtonGroup>
            <Button
              type="reset"
              id="reset-button"
              color="transparent"
              disable={disabled}
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button
              type="submit"
              id="apply-button"
              disable={disabled}
              style={{
                marginLeft: "10px",
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
