import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Main from "./components/Main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <CssBaseline />
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
