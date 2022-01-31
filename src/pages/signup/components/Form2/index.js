import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Select, Checkbox } from "antd";
import Button from "../../../../components/Button";
import {
  MINIMUM_AGE,
  GENDER_OPTIONS,
  MONTH_OPTIONS,
  DAY_OF_MONTHS,
} from "./constants";
import userAPI from "../../../api/userAPI";

function requiredField(fieldName) {
  return { required: true, message: `Please input your ${fieldName}` };
}

const validateDuplicateName = (rule, value, callback) => {
  const containSpecialChar = /[!-\/:-@[-`{-~]/.test(value);
  if (containSpecialChar) {
    callback("Username cannot contain special characters");
  }
  userAPI.findExact("username", value).then((res) => {
    if (value != "" && res.data.length > 0) {
      callback("This username has already been taken");
    } else {
      callback();
    }
  });
};

function isLeapYear(year) {
  if (year % 4 == 0) {
    if (year % 100 != 0) {
      return true;
    } else if (year % 100 == 0 && year % 400 == 0) {
      return true;
    }
  }
  return false;
}

const Form2 = () => {
  const [form2] = Form.useForm();
  const currentYear = new Date().getFullYear() + 1;
  const hundredYearAgo = new Date().getFullYear() - 100;
  // Get year options according to current year and min-max age range
  const YEAR_OPTIONS = Array.from(Array(currentYear - MINIMUM_AGE).keys())
    .slice(hundredYearAgo)
    .sort()
    .reverse();

  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const validateDate = (rule, year, callback) => {
    if (year == undefined) {
      callback("Please input your birth year");
    }
    if (month == 1 || month > 2) {
      if (DAY_OF_MONTHS[month - 1] < day) {
        callback("This is not a valid date");
      }
    } else if (month == 2) {
      if (day > 29) {
        callback("This is not a valid date");
      } else if (day == 29 && !isLeapYear(year)) {
        callback(`${year} is not a leap year`);
      }
    }
    callback();
  };

  return (
    <>
      <Form.Item
        name="username"
        rules={[
          requiredField("username"),
          { validator: validateDuplicateName },
        ]}
        hasFeedback
        form={form2}
      >
        <Input placeholder="Username" style={{ border: "2px solid black" }} />
      </Form.Item>

      <Form.Item style={{ marginBottom: "10px" }}>
        <Form.Item
          name="fName"
          noStyle
          rules={[requiredField("first name")]}
          hasFeedback
        >
          <Input
            placeholder="First name"
            style={{
              border: "2px solid black",
              display: "inline-block",
              width: "calc(50% - 4px)",
            }}
          />
        </Form.Item>
        <Form.Item
          name="lName"
          noStyle
          rules={[requiredField("last name")]}
          hasFeedback
        >
          <Input
            placeholder="Last name"
            style={{
              border: "2px solid black",
              display: "inline-block",
              width: "calc(50% - 4px)",
              margin: "0 0 0 8px",
            }}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item name="gender" label="Gender" style={{ marginBottom: "10px" }}>
        <Radio.Group options={GENDER_OPTIONS} />
      </Form.Item>

      <Form.Item style={{ marginBottom: "5px" }}>
        <Form.Item
          name="day"
          noStyle
          rules={[requiredField("birth date")]}
          hasFeedback
        >
          <Select
            placeholder="Day"
            onChange={(day) => setDay(day)}
            style={{
              border: "2px solid black",
              display: "inline-block",
              width: "calc(25% - 8px)",
            }}
          >
            {Array.from(Array(31).keys()).map((date) => (
              <Select.Option value={date + 1} key={date}>
                {date + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="month"
          noStyle
          rules={[requiredField("birth month")]}
          hasFeedback
        >
          <Select
            placeholder="Month"
            onChange={(month) => setMonth(month)}
            style={{
              border: "2px solid black",
              display: "inline-block",
              margin: "0 8px",
              width: "calc(45% - 8px)",
            }}
          >
            {MONTH_OPTIONS.map(({ label, value }) => (
              <Select.Option value={value} key={label}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="year"
          noStyle
          rules={[{ validator: validateDate }]}
          hasFeedback
        >
          <Select
            placeholder="Year"
            style={{
              border: "2px solid black",
              display: "inline-block",
              margin: "0 0 0 8px",
              width: "calc(30% - 8px)",
            }}
          >
            {YEAR_OPTIONS.map((year) => (
              <Select.Option value={year} key={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="agree"
        style={{ marginBottom: "0" }}
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      "Please read and agree to our terms of use and privacy policy"
                    )
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree to the <a href="#">Terms of Use</a> and{" "}
          <a href="#">Privacy Policy</a>
        </Checkbox>
      </Form.Item>

      <Form.Item name="username">
        <Button style={{ width: "100%", marginTop: "20px" }} type="submit">
          Create an account
        </Button>
      </Form.Item>
    </>
  );
};

export default Form2;
