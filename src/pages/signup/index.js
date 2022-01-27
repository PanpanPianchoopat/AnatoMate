import React from "react";
import GridBg from "../../components/GridBg";
import FormContainer from "../../components/FormContainer";
import { Form, Input } from "antd";
import Button from "../../components/Button";
import { StyledInput } from "./styled";
import Form1 from "../../components/signup/Form1";

const Register = () => {
  return (
    <GridBg>
      <FormContainer>
        <b>Create your account</b>
        <small>
          Already have an account? <a href="/login">Log in</a>
        </small>
        <br />
        {/* <Form>
          <Form.Item>
            <Input
              placeholder="Email"
              style={{ border: "2px solid black", height: "40px" }}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              placeholder="Password"
              style={{ border: "2px solid black", height: "40px" }}
            />
            <small>
              Min 8 characters include number, special character, uppercase and
              lowercase letters
            </small>
          </Form.Item>
          <Form.Item>
            <Input.Password
              placeholder="Confirm Password"
              style={{ border: "2px solid black", height: "40px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%", marginTop: "20px" }}>Next</Button>
          </Form.Item>
        </Form> */}
        <Form1 />
      </FormContainer>
    </GridBg>
  );
};

export default Register;
