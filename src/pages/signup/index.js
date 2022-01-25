import React from "react";
import Container from "../../components/Container";
import FormContainer from "../../components/FormContainer";

const Register = () => {
  return (
    <Container>
      <FormContainer>
        <b>Create your account</b>
        <small>
          Already have an account? <a href="/login">Log in</a>
        </small>
      </FormContainer>
    </Container>
  );
};

export default Register;
