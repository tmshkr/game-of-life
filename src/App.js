import React, { useEffect } from "react";
import Mousetrap from "mousetrap";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  useEffect(() => {
    console.log("App useEffect");
    Mousetrap.bind("f", function () {
      console.log("f");
    });
  }, []);
  return (
    <div className="App">
      <Header />
      <Footer />
      <Board mousetrap={Mousetrap} />
    </div>
  );
}

export default App;
