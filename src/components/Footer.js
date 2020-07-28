import React, { memo } from "react";
import "./Footer.scss";

function Footer(props) {
  const { isMenuVisible } = props;
  return (
    <footer
      className={isMenuVisible ? "" : "hidden"}
      onClick={() => {
        console.log("click");
      }}
    >
      <h1>Footer</h1>
    </footer>
  );
}

export default memo(Footer);
