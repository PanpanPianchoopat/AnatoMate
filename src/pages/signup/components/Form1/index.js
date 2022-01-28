import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import Button from "../../../../components/Button";
import Form2 from "../Form2";
import { useRouter } from "next/router";
import userAPI from "../../../api/userAPI";

const validateDistinctMail = (rule, value, callback) => {
  userAPI.findExact("email", value).then((res) => {
    if (value != "" && res.data.length > 0) {
      callback("This email has already been taken");
    } else {
      callback();
    }
  });
};

function getTwoDigit(num) {
  return ("0" + num).slice(-2);
}

const Form1 = () => {
  const [showNext, setShowNext] = useState(false);

  const [form1Info, setForm1Info] = useState(null);
  const [form2Info, setForm2Info] = useState(null);

  const router = useRouter();
  const handleSubmit = (value) => {
    if (!showNext) {
      setForm1Info(value);
      setShowNext(true);
    } else {
      setForm2Info(value);
    }
  };

  useEffect(() => {
    if (form2Info) {
      const userInfo = {
        email: form1Info.email,
        username: form2Info.username,
        firstname: form2Info.fName,
        lastname: form2Info.lName,
        pf_image: "",
        password: form1Info.password,
        dob: `${getTwoDigit(form2Info.day)}/${getTwoDigit(form2Info.month)}/${
          form2Info.year
        }`,
        sex: form2Info.gender ? form2Info.gender : "",
      };
      userAPI
        .signup(userInfo)
        .then((res) => {
          if (res) {
            console.log(res.data);
            router.push("/");
          }
        })
        .catch((e) => console.log(e));
    }
  }, [form2Info]);

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
