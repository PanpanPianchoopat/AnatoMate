import React from "react";
import GridBg from "../../components/GridBg";
import FormContainer from "../../components/FormContainer";
import Form1 from "./components/Form1";
import COLORS from "../../../public/constants/colors";

const Register = () => {
  return (
    <GridBg>
      <FormContainer>
        <b>Create your account</b>
        <small>
          Already have an account?{" "}
          <a href="/login" style={{ color: COLORS.ERROR_RED }}>
            Log in
          </a>
        </small>
        <br />
        <Form1 />
      </FormContainer>
    </GridBg>
  );
};

export default Register;
