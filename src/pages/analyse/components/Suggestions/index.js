import React, { useState } from "react";
import { Switch } from "antd";
import { SuggestionsWrapper, Comments, NoComment } from "./styled";

const Suggestions = () => {
  const [comments, setComments] = useState([]);
  return (
    <SuggestionsWrapper>
      <h2>Suggestions</h2>
      <div>
        Comparison <Switch />
      </div>
      {comments.length > 0 ? (
        <Comments></Comments>
      ) : (
        <NoComment>Nothing to suggest</NoComment>
      )}
    </SuggestionsWrapper>
  );
};

export default Suggestions;
