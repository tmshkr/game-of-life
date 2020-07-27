import React, { useEffect, useState } from "react";
import Mousetrap from "mousetrap";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  const [isMenuVisible, setMenuVisible] = useState(true);

  useEffect(() => {
    console.log("App useEffect");
    Mousetrap.bind("esc", function () {
      console.log("esc");
      setMenuVisible(!isMenuVisible);
    });
  }, [isMenuVisible]);

  return (
    <div className="App">
      <Header isMenuVisible={isMenuVisible} />
      <Footer isMenuVisible={isMenuVisible} />
      <Board Mousetrap={Mousetrap} />
    </div>
  );
}

export default App;
