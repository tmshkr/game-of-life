import React from "react";
import "./Footer.scss";

function Footer(props) {
  const { isMenuVisible } = props;
  return (
    <footer className={isMenuVisible ? "" : "hidden"}>
      <h1>Footer</h1>
    </footer>
  );
}

export default Footer;
