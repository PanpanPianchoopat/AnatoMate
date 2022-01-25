import React from "react";
import Container from "../../components/Container";
import FormContainer from "../../components/FormContainer";

const Login = () => {
  return (
    <Container>
      <FormContainer>
        <b>Login to your acccount</b>
        <small>
          Don't have an account yet? <a href="/register">Sign up</a>
        </small>
        <small style={{ alignSelf: "flex-end" }}>Forget Password?</small>
      </FormContainer>
    </Container>
  );
};

export default Login;
