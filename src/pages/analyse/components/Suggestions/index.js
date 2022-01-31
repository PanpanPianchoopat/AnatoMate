import React, { useEffect, useState } from "react";
import { Switch, Collapse, Radio, Tooltip } from "antd";
import {
  SuggestionsWrapper,
  Detail,
  NoComment,
  Smiley,
  ButtonGroup,
  OptionButton,
  Explanation,
} from "./styled";
import COLORS from "../../../../../public/constants/colors";
import Button from "../../../../components/Button";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SectionHeader, SectionUnderline } from "../HowTo/styled";

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
  const skinOption = ["transparent", "opaque"];
  const showModel = props ? props.showModel : false;
  const { Panel } = Collapse;
  const [reset, setReset] = useState(false);

  // disable reset keypoints to original position
  const [disableReKey, isDisableReKey] = useState(false);
  // disable re-upload new photo
  const [disableRePic, isDisableRePic] = useState(false);

  useEffect(() => {
    if (props) {
      setReset(props.isResetImg);
    }
  }, [props]);

  useEffect(() => {
    console.log("REC_SUGG", props.suggestions);
  }, [props.suggestions]);

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

  function handleResetImg() {
    setReset(!reset);
    props.setIsResetImg(true);
    props.setShowModel(false);
    props.setSuggestions([]);
  }

  function handleSwitch(isChecked) {
    props.setShowModel(isChecked);
    props.setShowPoints(false);
  }

  return (
    <SuggestionsWrapper>
      <Button
        id="re-pic-but"
        color="transparent"
        disable={disableRePic}
        onClick={() => handleResetImg()}
        style={{ width: "100%", fontWeight: "bold", margin: "3px 0" }}
      >
        Reupload Photo
      </Button>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <SectionHeader style={{ margin: "0" }}>Suggestions</SectionHeader>
          <Tooltip title={popContent} color="#404040">
            <Explanation />
          </Tooltip>
        </div>
        <SectionUnderline />
      </div>

      <div style={{ marginBottom: "10px" }}>
        Comparison
        <Switch
          checked={showModel}
          onChange={(isChecked) => handleSwitch(isChecked)}
          style={{
            marginLeft: "10px",
            background: showModel ? COLORS.DARK_PURPLE : "#dddddd",
          }}
        />
      </div>
      {showModel && (
        <ButtonGroup>
          {skinOption.map((option, idx) => (
            <OptionButton
              key={idx}
              onClick={() => props.setModelSkin(option)}
              isActive={props.modelSkin === option}
            >
              {option}
            </OptionButton>
          ))}
        </ButtonGroup>
      )}

      {props && props.suggestions ? (
        <div
          style={{
            height: `${showModel ? "300px" : "340px"}`,
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
                    fontWeight: "bold",
                  }}
                >
                  <Detail>{comment.comments}</Detail>
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
