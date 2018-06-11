import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
