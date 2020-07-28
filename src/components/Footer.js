import React, { memo } from "react";
import { ReactComponent as PlayButton } from "@fortawesome/fontawesome-free/svgs/solid/play.svg";
import { ReactComponent as PauseButton } from "@fortawesome/fontawesome-free/svgs/solid/pause.svg";

import "./Footer.scss";

function Footer(props) {
  const { app, isMenuVisible, running } = props;
  return (
    <footer
      className={isMenuVisible ? "" : "hidden"}
      onClick={() => {
        console.log("click");
      }}
    >
      {running ? (
        <PauseButton onClick={app.toggleSimulation} />
      ) : (
        <PlayButton onClick={app.toggleSimulation} />
      )}
    </footer>
  );
}

export default memo(Footer);
