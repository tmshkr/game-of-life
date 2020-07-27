import React, { useEffect, useRef, useState } from "react";
import { create2DMatrix, getNextGen } from "../utils/matrix";
import { cloneDeep } from "lodash";
import "./Board.scss";

function Board(props) {
  const [rows, setRows] = useState(Math.floor(window.innerHeight / 20));
  const [cols, setCols] = useState(Math.floor(window.innerWidth / 20));
  const [matrix, setMatrix] = useState(create2DMatrix(rows, cols));
  const [isRunning, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const nextGenRef = useRef(create2DMatrix(rows, cols));

  const handleClick = (e) => {
    const { i, j } = e.target.dataset;
    if (!(i && j)) return;
    nextGenRef.current[i][j] = nextGenRef.current[i][j] ? 0 : 1;
    setMatrix(cloneDeep(nextGenRef.current));
  };

  const handlekeyup = (e) => {
    if (e.which === 32) {
      console.log(intervalRef.current);
      if (!intervalRef.current) {
        nextGenRef.current = getNextGen(nextGenRef.current);
        intervalRef.current = setInterval(renderNextGen, 100);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const renderNextGen = () => {
    requestAnimationFrame(() => setMatrix(cloneDeep(nextGenRef.current)));
    nextGenRef.current = getNextGen(nextGenRef.current);
  };

  useEffect(() => {
    window.onkeyup = handlekeyup;
  }, [isRunning]);

  //   console.log("Board render", Date.now());

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
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

export default Board;
