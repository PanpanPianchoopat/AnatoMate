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
        <Form1 />
      </FormContainer>
    </GridBg>
  );
};

export default Register;
