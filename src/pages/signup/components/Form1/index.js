import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import Button from "../../../../components/Button";
import Form2 from "../Form2";
import { useRouter } from "next/router";
import userAPI from "../../../api/userAPI";

const Form1 = () => {
  const [showNext, setShowNext] = useState(false);
  const [info, setInfo] = useState(null);
  const [emailFeedback, setEmailFeedback] = useState(null);
  const [validPass, setValidPass] = useState("error");
  const [form1Info, setForm1Info] = useState(null);
  const [form2Info, setForm2Info] = useState(null);

  const [completeForm, setCompleteForm] = useState(null);
  const router = useRouter();
  const handleSubmit = (value) => {
    if (!showNext) {
      setForm1Info(value);
      setShowNext(true);
    } else {
      setForm2Info(value);
      // router.push("/"); // back to home after save info to database
    }
  };

  useEffect(() => {
    if (form2Info) {
      setCompleteForm({
        email: form1Info.email,
        username: form2Info.username,
        firstname: form2Info.fName,
        lastname: form2Info.lName,
        pf_image: null,
        password: form1Info.password,
        dob: `${form2Info.day}/${form2Info.month}/${form2Info.year}`,
        sex: form2Info.gender ? form2Info.gender : null,
      });
    }
  }, [form2Info]);

  useEffect(() => {
    console.log("COMPLETE", completeForm);
  }, [completeForm]);

  const validateDistinctMail = (rule, value, callback) => {
    userAPI.findExact("email", value).then((res) => {
      if (value != "" && res.data.length > 0) {
        callback("This email has already been taken");
      } else {
        callback();
      }
    });
  };

  return (
    <Form onFinish={handleSubmit} size="large">
      {!showNext && (
        <>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
              {
                type: "email",
                message: "This is not a valid email",
              },
              { validator: validateDistinctMail },
            ]}
          >
            <Input placeholder="Email" style={{ border: "2px solid black" }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const MIN_PASS_LEN = 8;
                  const tooShort = value.length < MIN_PASS_LEN;
                  const containNum = /\d/.test(value);
                  const containUpperCase = /[A-Z]/.test(value);
                  const containLowerCase = /[a-z]/.test(value);
                  const containSpecialChar = /[!-\/:-@[-`{-~]/.test(value);
                  if (
                    tooShort ||
                    !containNum ||
                    !containUpperCase ||
                    !containLowerCase ||
                    !containSpecialChar
                  ) {
                    return Promise.reject(
                      new Error(
                        `Min ${MIN_PASS_LEN} characters include number, special character, uppercase and lowercase letters`
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              style={{ border: "2px solid black" }}
            />
          </Form.Item>
          <Form.Item
            name="confirmPass"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
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
