import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import GridBg from "../../components/GridBg";
import { Form, Input } from "antd";
import Button from "../../components/Button";

const Login = () => {
  const [keywordType, setKeywordtype] = useState("username");
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <GridBg>
      <FormContainer>
        <b>Login to your acccount</b>
        <small>
          Don't have an account yet? <a href="/register">Sign up</a>
        </small>

        <Form onFinish={handleSubmit} size="large">
          <Form.Item name="username" style={{ marginTop: "20px" }}>
            <Input
              placeholder="Email/Username"
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              placeholder="Password"
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%", marginTop: "20px" }} type="submit">
              LOGIN
            </Button>
          </Form.Item>
        </Form>

        {/* <small style={{ alignSelf: "flex-end" }}>Forget Password?</small> */}
      </FormContainer>
    </GridBg>
  );
};

export default Login;
