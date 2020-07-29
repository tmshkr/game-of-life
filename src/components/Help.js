import React from "react";
import { ReactComponent as TimesCircle } from "@fortawesome/fontawesome-free/svgs/regular/times-circle.svg";
import "./Help.scss";

function Help(props) {
  const { app, isHelpModalVisible } = props;
  return (
    <div
      id="Help"
      className={isHelpModalVisible ? "visible" : ""}
      onClick={(e) => {
        if (e.target.id === "Help") {
          app.toggleHelp();
        }
      }}
    >
      <section>
        <h2>What is the Game of Life?</h2>
        <p>John Conway's Game of Life is governed by a few simple rules:</p>
        <ul>
          <li>Cells are either alive or dead</li>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ul>
        <p>
          Learn more on{" "}
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            target="_blank"
          >
            Wikipedia
          </a>
        </p>
      </section>
      <section>
        <h2>Keyboard Shortcuts</h2>
        <table>
          <tbody>
            <tr>
              <td>space</td>
              <td>toggle simulation on/off</td>
            </tr>
            <tr>
              <td>esc</td>
              <td>toggle info/control display</td>
            </tr>
            <tr>
              <td>left/right</td>
              <td>step backward/forward</td>
            </tr>
            <tr>
              <td>up/down</td>
              <td>increase/decrease interval</td>
            </tr>
          </tbody>
        </table>
      </section>
      <TimesCircle onClick={app.toggleHelp} />
    </div>
  );
}

export default Help;
