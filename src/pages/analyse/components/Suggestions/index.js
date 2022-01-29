import React, { useState } from "react";
import { Switch } from "antd";
import { SuggestionsWrapper, Comments, NoComment, Smiley } from "./styled";
import COLORS from "../../../../../public/constants/colors";

const Suggestions = ({ ...props }) => {
  const [comments, setComments] = useState([]);
  const showModel = props ? props.showModel : false;
  // const [showModel, setShowModel] = useState(false);
  return (
    <SuggestionsWrapper>
      <h2>Suggestions</h2>
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
      {comments.length > 0 ? (
        <Comments></Comments>
      ) : (
        <NoComment>
          Nothing to suggest <Smiley />
        </NoComment>
      )}
    </SuggestionsWrapper>
  );
};

export default Suggestions;
