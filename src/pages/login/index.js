import React from "react";
import FormContainer from "../../components/FormContainer";
import GridBg from "../../components/GridBg";

const Login = () => {
  return (
    <GridBg>
      <FormContainer>
        <b>Login to your acccount</b>
        <small>
          Don't have an account yet? <a href="/register">Sign up</a>
        </small>
        <small style={{ alignSelf: "flex-end" }}>Forget Password?</small>
      </FormContainer>
    </GridBg>
  );
};

export default Login;
