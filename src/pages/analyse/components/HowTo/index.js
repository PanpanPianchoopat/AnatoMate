import React from "react";
import { Form, Radio } from "antd";
import { SectionWrapper, SectionHeader, SectionUnderline } from "./styled";
import { Select } from "@react-three/drei";

const HowTo = () => {
  return (
    <SectionWrapper>
      <SectionHeader>How To</SectionHeader>
      <SectionUnderline />
      <p style={{ marginBottom: "50px" }}>
        1. Upload photo
        <br />
        2. Manually adjust the point for each limb
        <br />
        3. Click “Analyze” to let the system check your anatomy <br />
        4. Then you can improve your drawing from our suggestion
      </p>
      <SectionHeader>Preference</SectionHeader>
      <SectionUnderline />
      <Form size="large">
        <Form.Item name="sex" label="Sex">
          <Radio.Group
            options={[
              { label: "male", value: "M" },
              { label: "female", value: "F" },
            ]}
          />
        </Form.Item>
      </Form>
    </SectionWrapper>
  );
};

export default HowTo;
