import React, { Component, useEffect, useState, useRef } from "react";
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
    };
  }

  componentDidMount() {
    Mousetrap.bind(
      "esc",
      function () {
        console.log("esc");
        const { isMenuVisible } = this.state;
        this.setState({ isMenuVisible: !isMenuVisible });
      }.bind(this)
    );
  }

  render() {
    const { isMenuVisible, genCount } = this.state;
    return (
      <div className="App">
        <Header isMenuVisible={isMenuVisible} genCount={genCount} />
        <Footer isMenuVisible={isMenuVisible} />
        <Board Mousetrap={Mousetrap} app={this} />
      </div>
    );
  }
}

export default App;
