import React from "react";
import "./Header.scss";

function Header(props) {
  const { isMenuVisible, genCount } = props;
  return (
    <header className={isMenuVisible ? "" : "hidden"}>
      <h1>{`Generation: ${genCount}`}</h1>
    </header>
  );
}

export default Header;
