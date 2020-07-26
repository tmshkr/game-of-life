import React, { useEffect, useRef, useState } from "react";
import { create2DMatrix } from "../utils/matrix";
import "./Board.scss";

function Board(props) {
  const [rows, setRows] = useState(Math.floor(window.innerHeight / 20));
  const [cols, setCols] = useState(Math.floor(window.innerWidth / 20));
  const [matrix, setMatrix] = useState(create2DMatrix(rows, cols));
  const [isRunning, setRunning] = useState(false);
  console.log("render");

  const handleClick = (e) => {
    if (isRunning) setRunning(false);
    const { i, j } = e.target.dataset;
    e.target.classList.toggle("alive");
    matrix[i][j] = matrix[i][j] ? 0 : 1;
    console.log(matrix);
  };

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
