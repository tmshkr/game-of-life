import React, { useEffect, useRef, useState, memo } from "react";
import Mousetrap from "mousetrap";
import { create2DMatrix, getNextGen, clone, resize } from "../utils/matrix";
import { debounce } from "lodash";
import "./Board.scss";

function Board(props) {
  const { app } = props;
  const [rows, setRows] = useState(Math.floor(window.innerHeight / 20));
  const [cols, setCols] = useState(Math.floor(window.innerWidth / 20));
  const [matrix, setMatrix] = useState(create2DMatrix(rows, cols));
  const timeoutRef = useRef(null);
  const nextGenRef = useRef(create2DMatrix(rows, cols));

  const handleClick = (e) => {
    const { i, j } = e.target.dataset;
    if (!(i && j)) return;
    nextGenRef.current[i][j] = nextGenRef.current[i][j] ? 0 : 1;
    setMatrix(clone(nextGenRef.current));
  };

  const renderNextGen = () => {
    nextGenRef.current = getNextGen(nextGenRef.current);
    app.setState({ genCount: app.state.genCount + 1 });
    requestAnimationFrame(() => setMatrix(clone(nextGenRef.current)));
    timeoutRef.current = setTimeout(renderNextGen, app.state.timeout);
  };

  const handleresize = (e) => {
    console.log("handleresize", Date.now());
    const rows = Math.floor(window.innerHeight / 20);
    const cols = Math.floor(window.innerWidth / 20);
    nextGenRef.current = resize(nextGenRef.current, rows, cols);
    setMatrix(clone(nextGenRef.current));
    setRows(rows);
    setCols(cols);
  };

  useEffect(() => {
    window.onresize = debounce(handleresize, 500);
    Mousetrap.bind(
      "space",
      function (e) {
        console.log(timeoutRef.current);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
          app.setState({ running: false });
        } else {
          timeoutRef.current = setTimeout(renderNextGen, app.state.timeout);
          app.setState({ running: true });
        }
      },
      "keyup"
    );
  }, []);

  console.log("Board render", Date.now());

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      className={app.state.running ? "active" : ""}
      onClick={handleClick}
    >
      {matrix.map((row, i) =>
        row.map((cell, j) => (
          <span
            key={[i, j]}
            className={cell === 1 ? "alive" : ""}
            data-i={i}
            data-j={j}
          />
        ))
      )}
    </div>
  );
}

export default memo(Board);
