import React, { memo } from "react";
import { clone } from "../utils/matrix";
import "./Board.scss";

function Board(props) {
  const { app, running, matrix } = props;

  const handleClick = (e) => {
    const { i, j } = e.target.dataset;
    if (!(i && j)) return;
    const newMatrix = clone(app.history.current.matrix);
    newMatrix[i][j] = newMatrix[i][j] ? 0 : 1;
    app.history.replace(newMatrix);
    app.setState({ matrix: app.history.current.matrix });
  };

  console.log("Board render", Date.now());

  return (
    <div
      id="board"
      style={{ gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)` }}
      className={running ? "active" : ""}
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
