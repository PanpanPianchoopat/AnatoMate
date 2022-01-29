import React from "react";
import { Collapse } from "antd";

const Comments = ({ ...props }) => {
  const { Panel } = Collapse;
  const suggestions = props ? props.comments : [];
  const text = `est1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1Test1`;
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="This is panel header 1" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};

export default Comments;
