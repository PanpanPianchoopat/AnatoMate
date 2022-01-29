import React, { useEffect, useState } from "react";
import { Switch, Collapse, Col, Tooltip } from "antd";
import { SuggestionsWrapper, NoComment, Smiley } from "./styled";
import COLORS from "../../../../../public/constants/colors";
import Button from "../../../../components/Button";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const MOCK_COMMENTS = [
  { header: "Test3", comments: "Tpp short", severity: 2 },
  {
    header:
      "Puff the magic dragon lived by the sea And frolicked in the autumn mist in a land called Honah Lee Little Jackie Paper loved that rascal Puff And brought him strings and sealing wax and other fancy stuff",
    comments:
      "ในโลกที่มี ความวกวนในโลกที่ทุกคนต้องดิ้นรนที่สับสน ร้อนรนจนใจ นั้นแสนเหนื่อยในโลกที่ความทุกข์ท้อใจได้เดินผ่านเข้ามาเรื่อยๆจนบางครั้งไม่รู้จะข้ามไปเช่นไร",
    severity: 3,
  },
  { header: "Test2", comments: "Tpp long", severity: 2 },
  { header: "Test3", comments: "Tpp short", severity: 1 },
  { header: "Test3", comments: "Tpp short", severity: 1 },
  { header: "Test3", comments: "Tpp short", severity: 1 },
];

function getTagColor(severity) {
  if (severity == 3) {
    return COLORS.ERROR_RED;
  } else if (severity == 2) {
    return "#FFD62C";
  } else {
    return "#9DDE5D";
  }
}

export const CustomPanel = ({ headerInfo, children, ...props }) => {
  const calCulatedHeader = headerInfo;
  return (
    <Collapse.Panel header={calCulatedHeader} {...props}>
      {children}
    </Collapse.Panel>
  );
};

const Suggestions = ({ ...props }) => {
  const [comments, setComments] = useState(1);
  const showModel = props ? props.showModel : false;
  const { Panel } = Collapse;
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (props) {
      setReset(props.isReset);
    }
  }, [props]);

  const popContent = (
    <div style={{ margin: "10px 5px 0 5px" }}>
      <p>Red: Strongly suggest</p>
      <p>Yellow: Moderately suggest</p>
      <p>Green: Up to you!</p>
    </div>
  );

  function handleReset() {
    setReset(!reset);
    props.setIsReset(!reset);
  }

  return (
    <SuggestionsWrapper>
      <Button color="transparent" style={{ width: "100%", fontWeight: "bold" }}>
        Reset Keypoint
      </Button>
      <Button
        color="transparent"
        style={{ width: "100%", fontWeight: "bold", margin: "15px 0" }}
        onClick={handleReset}
      >
        Reupload Photo
      </Button>
      <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
        <h2 style={{ margin: "0" }}>Suggestions</h2>
        <Tooltip title={popContent} color="#404040">
          <AiOutlineQuestionCircle
            style={{ fontSize: "1.5em", marginLeft: "5px", cursor: "pointer" }}
          />
        </Tooltip>
      </div>

      <div>
        Comparison
        <Switch
          checked={showModel}
          onChange={(val) => props.setShowModel(val)}
          style={{
            marginLeft: "10px",
            background: showModel ? COLORS.DARK_PURPLE : "#dddddd",
          }}
        />
      </div>

      {comments ? (
        <div
          style={{
            height: "320px",
            overflow: "auto",
            marginTop: "10px",
          }}
        >
          <Collapse accordion expandIcon={() => null} bordered={false}>
            {MOCK_COMMENTS.sort((a, b) =>
              a.severity > b.severity ? -1 : 1
            ).map((comment, idx) => (
              <Panel
                key={idx}
                header={comment.header}
                style={{
                  border: "2px solid black",
                  marginBottom: "15px",
                  background: `linear-gradient(90deg, ${getTagColor(
                    comment.severity
                  )} 10px, white 0%)`,
                }}
              >
                <p
                  style={{
                    fontSize: "0.8em",
                    overflow: "hidden",
                  }}
                >
                  {comment.comments}
                </p>
              </Panel>
            ))}
          </Collapse>
        </div>
      ) : (
        <NoComment>
          Nothing to suggest <Smiley />
        </NoComment>
      )}
    </SuggestionsWrapper>
  );
};

export default Suggestions;
