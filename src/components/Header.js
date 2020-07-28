import React, { memo } from "react";
import "./Header.scss";

function Header(props) {
  const { interval, isMenuVisible, genCount } = props;
  return (
    <header className={isMenuVisible ? "" : "hidden"}>
      <h4>{`Generation: ${genCount}`}</h4>
      <h4>{`Interval: ${interval}ms`}</h4>
    </header>
  );
}

export default memo(Header);
