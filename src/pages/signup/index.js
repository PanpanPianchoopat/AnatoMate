import React from "react";
import GridBg from "../../components/GridBg";
import FormContainer from "../../components/FormContainer";
import Form1 from "./components/Form1";

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
