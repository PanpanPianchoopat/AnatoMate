import React from "react";
import { Form, Input, Radio, Select, Checkbox } from "antd";
import Button from "../../Button";
import { SelectInput } from "./styled";

const Form2 = () => {
  const MINIMUM_AGE = 13;
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];
  const monthOption = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  return (
    <>
      <Form.Item name="username">
        <Input placeholder="Username" style={{ border: "2px solid black" }} />
      </Form.Item>
      <Form.Item style={{ marginBottom: "10px" }}>
        <Form.Item name="fName" noStyle>
          <Input
            placeholder="Firstname"
            style={{
              border: "2px solid black",
              display: "inline-block",
              width: "calc(50% - 4px)",
            }}
          />
        </Form.Item>
        <Form.Item name="lName" noStyle>
          <Input
            placeholder="Lastname"
            style={{
              border: "2px solid black",
              display: "inline-block",
              width: "calc(50% - 4px)",
              margin: "0 0 0 8px",
            }}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender (optional)"
        style={{ marginBottom: "10px" }}
      >
        <Radio.Group options={genderOptions} />
      </Form.Item>

      <Form.Item style={{ marginBottom: "5px" }}>
        <Form.Item noStyle>
          <Select
            placeholder="Day"
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
        <Form.Item noStyle>
          <Select
            placeholder="Month"
            style={{
              border: "2px solid black",
              display: "inline-block",
              margin: "0 8px",
              width: "calc(45% - 8px)",
            }}
          >
            {monthOption.map(({ label, value }) => (
              <Select.Option value={value} key={label}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <Select
            placeholder="Year"
            style={{
              border: "2px solid black",
              display: "inline-block",
              margin: "0 0 0 8px",
              width: "calc(30% - 8px)",
            }}
          >
            {Array.from(
              Array(new Date().getFullYear() + 1 - MINIMUM_AGE).keys()
            )
              .slice(new Date().getFullYear() - 100)
              .sort()
              .reverse()
              .map((year) => (
                <Select.Option value={year} key={year}>
                  {year}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
        <Checkbox>
          I agree to the <a href="">Terms of Use</a> and{" "}
          <a href="">Privacy Policy</a>
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
