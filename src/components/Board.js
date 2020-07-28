import React, { useEffect, memo } from "react";
import Mousetrap from "mousetrap";
import { getNextGen, clone, resize } from "../utils/matrix";
import { debounce } from "lodash";
import "./Board.scss";

function Board(props) {
  const { app, running, matrix } = props;

  const handleClick = (e) => {
    const { i, j } = e.target.dataset;
    if (!(i && j)) return;
    app.nextGen[i][j] = app.nextGen[i][j] ? 0 : 1;
    app.setState({ matrix: clone(app.nextGen) });
  };

  const renderNextGen = () => {
    app.nextGen = getNextGen(app.nextGen);
    app.setState({ genCount: app.state.genCount + 1 });
    requestAnimationFrame(() => app.setState({ matrix: clone(app.nextGen) }));
    app.state.timer = setTimeout(renderNextGen, app.state.interval);
  };

  const handleresize = (e) => {
    console.log("handleresize", Date.now());
    const rows = Math.floor(window.innerHeight / 20);
    const cols = Math.floor(window.innerWidth / 20);
    app.nextGen = resize(app.nextGen, rows, cols);
    app.setState({ matrix: clone(app.nextGen) });
  };

  useEffect(() => {
    window.onresize = debounce(handleresize, 500);
    app.start = renderNextGen;
    Mousetrap.bind(
      "space",
      function (e) {
        console.log(app.state.timer);
        if (app.state.timer) {
          clearTimeout(app.state.timer);
          app.state.timer = null;
          app.setState({ running: false });
        } else {
          app.state.timer = setTimeout(app.start, app.state.timeout);
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
