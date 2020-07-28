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
    this.timer = null;
    this.state = {
      isMenuVisible: true,
      genCount: 0,
      interval: 500,
      timer: null,
      running: false,
      matrix: create2DMatrix(rows, cols),
    };

    this.renderNextGen = this.renderNextGen.bind(this);
  }

  componentDidMount() {
    const app = this;
    Mousetrap.bind(
      "space",
      function (e) {
        console.log(app.timer);
        if (app.timer) {
          clearTimeout(app.timer);
          app.timer = null;
          app.setState({ running: false });
        } else {
          app.timer = setTimeout(app.renderNextGen, app.state.timeout);
          app.setState({ running: true });
        }
      },
      "keyup"
    );

    Mousetrap.bind(
      "esc",
      function () {
        requestAnimationFrame(() =>
          app.setState({ isMenuVisible: !app.state.isMenuVisible })
        );
      },
      "keyup"
    );
  }

  renderNextGen() {
    const app = this;
    app.nextGen = getNextGen(app.nextGen);
    app.setState({ genCount: app.state.genCount + 1 });
    requestAnimationFrame(function () {
      app.setState({ matrix: clone(app.nextGen) });
    });
    app.timer = setTimeout(app.renderNextGen, app.state.interval);
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
