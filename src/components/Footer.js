import React, { memo } from "react";
import { ReactComponent as PlayButton } from "@fortawesome/fontawesome-free/svgs/solid/play.svg";
import { ReactComponent as PauseButton } from "@fortawesome/fontawesome-free/svgs/solid/pause.svg";
import { ReactComponent as BackButton } from "@fortawesome/fontawesome-free/svgs/solid/backward.svg";
import { ReactComponent as ForwardButton } from "@fortawesome/fontawesome-free/svgs/solid/forward.svg";
import { ReactComponent as HelpButton } from "@fortawesome/fontawesome-free/svgs/regular/question-circle.svg";
import { ReactComponent as GitHub } from "@fortawesome/fontawesome-free/svgs/brands/github.svg";

import "./Footer.scss";

function Footer(props) {
  const { app, isMenuVisible, running } = props;

  return (
    <footer className={isMenuVisible ? "" : "hidden"}>
      <HelpButton onClick={app.toggleHelp} />
      <div className="controls">
        <BackButton onClick={app.stepBackward} />
        {running ? (
          <PauseButton onClick={app.toggleSimulation} />
        ) : (
          <PlayButton onClick={app.toggleSimulation} />
        )}
        <ForwardButton onClick={app.stepForward} />
      </div>
      <GitHub
        onClick={() =>
          window.open("https://github.com/tmshkr/game-of-life", "_blank")
        }
      />
    </footer>
  );
}

export default memo(Footer);
