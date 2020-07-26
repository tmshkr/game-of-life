import React, { useEffect, useRef, useState } from "react";
import { create2DMatrix } from "../utils/matrix";
import "./Board.scss";

function Board(props) {
  const [rows, setRows] = useState(Math.floor(window.innerHeight / 20));
  const [cols, setCols] = useState(Math.floor(window.innerWidth / 20));
  const [matrix, setMatrix] = useState(create2DMatrix(rows, cols));
  console.log("render");

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      onClick={(e) => console.log(e.target)}
    >
      {matrix.map((row, i) =>
        row.map((cell, j) => <span key={`${i},${j}`} data-i={i} data-j={j} />)
      )}
    </div>
  );
}

export default Board;
