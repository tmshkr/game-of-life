import React from "react";
import "./Header.scss";

function Header(props) {
  const { isMenuVisible } = props;
  return (
    <header className={isMenuVisible ? "" : "hidden"}>
      <h1>Header</h1>
    </header>
  );
}

export default Header;
