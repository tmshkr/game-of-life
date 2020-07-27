import React, { Component } from "react";
import Mousetrap from "mousetrap";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: true,
      genCount: 0,
      timeout: 500,
      running: false,
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
    const { isMenuVisible, genCount } = this.state;
    return (
      <div className="App">
        <Header isMenuVisible={isMenuVisible} genCount={genCount} />
        <Footer isMenuVisible={isMenuVisible} />
        <Board app={this} />
      </div>
    );
  }
}

export default App;
