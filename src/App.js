import React, { Component } from "react";
import Mousetrap from "mousetrap";
import { create2DMatrix, getNextGen, clone, resize } from "./utils/matrix";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    const rows = Math.floor(window.innerHeight / 20);
    const cols = Math.floor(window.innerWidth / 20);
    this.nextGen = create2DMatrix(rows, cols);
    this.state = {
      isMenuVisible: true,
      genCount: 0,
      interval: 500,
      timer: null,
      running: false,
      matrix: create2DMatrix(rows, cols),
    };
  }

  componentDidMount() {
    Mousetrap.bind(
      "esc",
      function () {
        requestAnimationFrame(() =>
          this.setState({ isMenuVisible: !this.state.isMenuVisible })
        );
      }.bind(this),
      "keyup"
    );
  }

  render() {
    const { isMenuVisible, genCount, matrix, running } = this.state;
    return (
      <div className="App">
        <Header isMenuVisible={isMenuVisible} genCount={genCount} />
        <Footer isMenuVisible={isMenuVisible} />
        <Board app={this} matrix={matrix} running={running} />
      </div>
    );
  }
}

export default App;
