import React, { memo, useRef } from "react";
import "./Header.scss";

function Header(props) {
  const { app, interval, isMenuVisible, genCount } = props;
  const timerRef = useRef(null);

  const handleInput = (e) => {
    const target = e.target;
    let num = Number(target.innerHTML);
    if (isNaN(num)) num = 500;
    else if (num < 50) num = 50;
    else if (num > 1000) num = 1000;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (num === interval) target.innerHTML = num;
      else app.setState({ interval: num });
    }, 1000);
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
          dangerouslySetInnerHTML={{ __html: interval }}
        />
        <p>ms</p>
      </label>
    </header>
  );
}

export default memo(Header);
