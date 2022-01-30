import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import GridBg from "../../components/GridBg";
import { Form, Input, message } from "antd";
import Button from "../../components/Button";
import userAPI from "../api/userAPI";
import { useRouter } from "next/router";
import { ErrorMessage } from "./styled";
import COLORS from "../../../public/constants/colors";

const Login = () => {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = (value) => {
    userAPI
      .login(value)
      .then((res) => {
        if (res) {
          router.push("/analyse");
        }
      })
      .catch((e) => {
        setInvalid(true);
      });
  };

  return (
    <GridBg>
      <FormContainer>
        <b>Login to your acccount</b>
        <small>
          Don't have an account yet?{" "}
          <a href="/signup" style={{ color: COLORS.ERROR_RED }}>
            Sign up
          </a>
        </small>

        <Form onFinish={handleSubmit} size="large">
          <Form.Item name="username" style={{ marginTop: "20px" }}>
            <Input
              placeholder="Email/Username"
              onChange={() => setInvalid(false)}
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              placeholder="Password"
              onChange={() => setInvalid(false)}
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          {invalid && <ErrorMessage>Invalid username or password</ErrorMessage>}
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
