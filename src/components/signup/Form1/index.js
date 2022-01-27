import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import Button from "../../Button";
import Form2 from "../Form2";

const Form1 = () => {
  const [showNext, setShowNext] = useState(false);
  const [info, setInfo] = useState(null);
  const [validPass, setValidPass] = useState("error");
  const [form1Info, setForm1Info] = useState(null);
  const [form2Info, setForm2Info] = useState(null);
  const handleSubmit = (value) => {
    if (!showNext) {
      setForm1Info(value);
      setShowNext(true);
    } else {
      setForm2Info(value);
    }
  };

  useEffect(() => {
    console.log("1", form1Info);
    console.log("2", form2Info);
  }, [form1Info, form2Info]);
  return (
    <Form onFinish={handleSubmit} size="large">
      {!showNext && (
        <>
          <Form.Item name="email">
            <Input placeholder="Email" style={{ border: "2px solid black" }} />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              placeholder="Password"
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          <Form.Item name="confirmPass">
            <Input.Password
              placeholder="Confirm Password"
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%", marginTop: "20px" }} type="submit">
              Next
            </Button>
          </Form.Item>
        </>
      )}
      {showNext && <Form2 />}
    </Form>
  );
};

export default Form1;
