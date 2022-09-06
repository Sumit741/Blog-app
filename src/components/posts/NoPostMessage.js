import React from "react";
import "../../styles/styles.scss";

function NoPostMessage() {
  return (
    <div className="message-container">
      <img src={"./search.png"} />
      <span>OPPS !! No Posts to view.</span>
    </div>
  );
}

export default NoPostMessage;
