import React, { useEffect, useState } from "react";
import { Switch, Collapse, Radio, Tooltip } from "antd";
import { SuggestionsWrapper, NoComment, Smiley } from "./styled";
import COLORS from "../../../../../public/constants/colors";
import Button from "../../../../components/Button";
import { AiOutlineQuestionCircle } from "react-icons/ai";

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

  // disable reset keypoints to original position
  const [disableReKey, isDisableReKey] = useState(true);
  // disable re-upload new photo
  const [disableRePic, isDisableRePic] = useState(false);

  useEffect(() => {
    if (props) {
      setReset(props.isReset);
    }
  }, [props]);

  useEffect(() => {
    console.log("REC_SUGG", props.suggestions);
  }, [props.suggestions]);

  useEffect(() => {
    document.getElementById("re-key-but").disabled = disableReKey;
  }, [disableReKey]);

  useEffect(() => {
    document.getElementById("re-pic-but").disabled = disableRePic;
  }, [disableRePic]);

  const popContent = (
    <div style={{ margin: "10px 5px 0 5px" }}>
      <p>Red: Strongly suggest</p>
      <p>Yellow: Moderately suggest</p>
      <p>Green: Up to you!</p>
    </div>
  );

  function handleReset() {
    setReset(!reset);
    props.setIsReset(true);
  }
  const [modelSkin, setModelSkin] = useState("transparent");
  const skinOption = [
    { label: "transparent", value: "transparent" },
    { label: "opaque", value: "opaque" },
  ];
  return (
    <SuggestionsWrapper>
      <Button
        id="re-key-but"
        color="transparent"
        disable={disableReKey}
        style={{ width: "100%", fontWeight: "bold" }}
      >
        Reset Keypoint
      </Button>
      <Button
        id="re-pic-but"
        color="transparent"
        disable={disableRePic}
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

      <div style={{ background: "pink" }}>
        Comparison
        <Switch
          checked={showModel}
          onChange={(val) => props.setShowModel(val)}
          style={{
            marginLeft: "10px",
            background: showModel ? COLORS.DARK_PURPLE : "#dddddd",
          }}
        />
        <div>
          {skinOption.map((option, idx) => (
            <div key={idx} style={{ border: "2px solid black" }}>
              {option.label}
            </div>
          ))}
        </div>
      </div>

      {props && props.suggestions ? (
        <div
          style={{
            height: "320px",
            overflow: "auto",
            marginTop: "10px",
          }}
        >
          <Collapse accordion expandIcon={() => null} bordered={false}>
            {props.suggestions
              .sort((a, b) => (a.severity > b.severity ? -1 : 1))
              .map((comment, idx) => (
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
