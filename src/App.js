import React, { Component } from "react";
import Mousetrap from "mousetrap";
import { create2DMatrix, getNextGen, clone, resize } from "./utils/matrix";
import History from "./utils/history";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    const rows = Math.floor(window.innerHeight / 20);
    const cols = Math.floor(window.innerWidth / 20);
    this.timer = null;
    this.history = new History(create2DMatrix(rows, cols));
    this.state = {
      isMenuVisible: true,
      genCount: 0,
      interval: 500,
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
    Mousetrap.bind("left", app.stepBackward);
    Mousetrap.bind("right", app.stepForward);
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
    this.timer ? this.stop() : this.start();
  };

  start = () => {
    this.renderNextGen();
    this.setState({ running: true });
  };

  stop = () => {
    clearTimeout(this.timer);
    this.timer = null;
    this.setState({ running: false });
  };

  stepBackward = () => {
    if (this.state.genCount > 0) {
      if (this.timer) this.stop();
      this.history.goBack();
      this.setState({
        matrix: this.history.current.matrix,
        genCount: this.history.current.gen,
      });
    }
  };

  stepForward = () => {
    if (this.timer) this.stop();
    this.history.goForward();
    this.setState({
      matrix: this.history.current.matrix,
      genCount: this.history.current.gen,
    });
  };

  renderNextGen = () => {
    const app = this;
    if (app.history.current.next) {
      app.history.goForward();
    } else {
      const nextMatrix = getNextGen(app.history.current.matrix);
      app.history.enqueue(nextMatrix);
    }
    requestAnimationFrame(function () {
      app.setState({
        matrix: app.history.current.matrix,
        genCount: app.history.current.gen,
      });
    });
    app.timer = setTimeout(app.renderNextGen, app.state.interval);
  };

  render() {
    const { interval, isMenuVisible, genCount, matrix, running } = this.state;
    return (
      <div
        className="App"
        onContextMenu={(e) => {
          e.preventDefault();
          this.toggleMenu();
        }}
      >
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
