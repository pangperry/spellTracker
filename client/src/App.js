import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <CssBaseline />
          <Header />
          <Route exact path="/" component={Landing} />
          <Navbar />
          <Main />
        </div>
      </Router>
    );
  }
}

export default App;
