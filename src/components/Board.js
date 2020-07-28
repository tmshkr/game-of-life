import React, { useEffect, memo } from "react";
import { clone, resize } from "../utils/matrix";
import { debounce } from "lodash";
import "./Board.scss";

function Board(props) {
  const { app, running, matrix } = props;

  const handleClick = (e) => {
    const { i, j } = e.target.dataset;
    if (!(i && j)) return;
    app.nextGen[i][j] = app.nextGen[i][j] ? 0 : 1;
    app.history.replace(clone(app.nextGen));
    app.setState({ matrix: app.history.current.matrix });
  };

  const handleresize = (e) => {
    const rows = Math.floor(window.innerHeight / 20);
    const cols = Math.floor(window.innerWidth / 20);
    app.nextGen = resize(app.nextGen, rows, cols);
    app.setState({ matrix: clone(app.nextGen) });
  };

  useEffect(() => {
    window.onresize = debounce(handleresize, 500);
  }, []);

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
