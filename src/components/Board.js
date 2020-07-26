import React, { useEffect, useRef, useState } from "react";
import { create2DMatrix, getNextGen } from "../utils/matrix";
import "./Board.scss";

function Board(props) {
  const [rows, setRows] = useState(Math.floor(window.innerHeight / 20));
  const [cols, setCols] = useState(Math.floor(window.innerWidth / 20));
  const [matrix, setMatrix] = useState(create2DMatrix(rows, cols));
  const [isRunning, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const nextGenRef = useRef(matrix);

  const handleClick = (e) => {
    if (isRunning) setRunning(false);
    const { i, j } = e.target.dataset;
    e.target.classList.toggle("alive");
    nextGenRef.current[i][j] = nextGenRef.current[i][j] ? 0 : 1;
  };

  const handlekeyup = (e) => {
    if (e.which === 32) {
      console.log(intervalRef.current);
      if (!intervalRef.current) {
        nextGenRef.current = getNextGen(nextGenRef.current);
        intervalRef.current = setInterval(renderNextGen, 500);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const renderNextGen = () => {
    setMatrix(nextGenRef.current);
    nextGenRef.current = getNextGen(nextGenRef.current);
  };

  useEffect(() => {
    window.onkeyup = handlekeyup;
  }, [isRunning]);

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      onClick={handleClick}
    >
      {matrix.map((row, i) =>
        row.map((cell, j) => (
          <span
            key={`${i},${j}`}
            className={cell ? "alive" : ""}
            data-i={i}
            data-j={j}
          />
        ))
      )}
    </div>
  );
}

export default Board;
