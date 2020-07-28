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
  }

  componentDidMount() {
    const app = this;
    Mousetrap.bind("space", app.toggleSimulation, "keyup");
    Mousetrap.bind("esc", app.toggleMenu, "keyup");
    Mousetrap.bind("up", app.increaseInterval);
    Mousetrap.bind("down", app.decreaseInterval);
  }

  toggleMenu = () => {
    const app = this;
    requestAnimationFrame(() =>
      app.setState({ isMenuVisible: !app.state.isMenuVisible })
    );
  };

  increaseInterval = () => {
    if (this.state.interval < 1000)
      this.setState({ interval: this.state.interval + 10 });
  };

  decreaseInterval = () => {
    if (this.state.interval > 50)
      this.setState({ interval: this.state.interval - 10 });
  };

  toggleSimulation = () => {
    const app = this;
    if (app.timer) {
      clearTimeout(app.timer);
      app.timer = null;
      app.setState({ running: false });
    } else {
      app.timer = setTimeout(app.renderNextGen, app.state.interval);
      app.setState({ running: true });
    }
  };

  renderNextGen = () => {
    const app = this;
    app.nextGen = getNextGen(app.nextGen);
    requestAnimationFrame(function () {
      app.setState({
        matrix: clone(app.nextGen),
        genCount: app.state.genCount + 1,
      });
    });
    app.timer = setTimeout(app.renderNextGen, app.state.interval);
  };

  render() {
    const { interval, isMenuVisible, genCount, matrix, running } = this.state;
    return (
      <div className="App">
        <Header
          isMenuVisible={isMenuVisible}
          genCount={genCount}
          interval={interval}
        />
        <Footer app={this} isMenuVisible={isMenuVisible} running={running} />
        <Board app={this} matrix={matrix} running={running} />
      </div>
    );
  }
}

export default App;
