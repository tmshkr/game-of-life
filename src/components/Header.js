import React, { memo, useRef } from "react";
import "./Header.scss";

function Header(props) {
  const { app, interval, isMenuVisible, genCount } = props;
  const timerRef = useRef(null);

  const handleInput = (e) => {
    const target = e.target;
    let num = Number(target.innerHTML);
    if (isNaN(num)) num = interval;
    else if (num < 50) num = 50;
    else if (num > 1000) num = 1000;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      target.blur();
      if (num === interval) target.innerHTML = num;
      else app.setState({ interval: num });
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      e.target.blur();
      clearTimeout(timerRef.current);
      let num = Number(e.target.innerHTML);
      if (isNaN(num)) num = interval;
      else if (num < 50) num = 50;
      else if (num > 1000) num = 1000;
      if (num === interval) e.target.innerHTML = num;
      else app.setState({ interval: num });
    }
  };

  return (
    <header className={isMenuVisible ? "" : "hidden"}>
      <label>
        Generation:
        <p>{genCount}</p>
      </label>
      <label>
        Interval:
        <p
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          dangerouslySetInnerHTML={{ __html: interval }}
        />
        <p>ms</p>
      </label>
    </header>
  );
}

export default memo(Header);
