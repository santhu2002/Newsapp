import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  swap = () => {
    if (this.state.mode === "light") {
      this.setState({
        mode: "dark"
      }
      )
      document.body.style.backgroundColor = "black"
    }
    else {
      this.setState({
        mode: "light"
      })
      document.body.style.backgroundColor = "white"

    }

  }
  constructor() {
    super();
    this.state = {
      mode: "light"
    }
  }
  pagesize = 5
  render() {
    return (
      <div>
        <Router>
          <Navbar swap={this.swap} mode={this.state.mode} />
          <Switch>
            <Route exact path="/"><News key="general" pagesize={this.pagesize} country="in" category="general" mode={this.state.mode} /> </Route>
            <Route exact path="/business"><News key="business" pagesize={this.pagesize} country="in" category="business" mode={this.state.mode} /> </Route>
            <Route exact path="/entertainment"><News key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" mode={this.state.mode} /> </Route>
            <Route exact path="/general"><News key="general" pagesize={this.pagesize} country="in" category="general" mode={this.state.mode} /> </Route>
            <Route exact path="/health"><News key="health" pagesize={this.pagesize} country="in" category="health" mode={this.state.mode} /> </Route>
            <Route exact path="/science"><News key="science" pagesize={this.pagesize} country="in" category="science" mode={this.state.mode} /> </Route>
            <Route exact path="/sports"><News key="sport" pagesize={this.pagesize} country="in" category="sports" mode={this.state.mode} /> </Route>
            <Route exact path="/technology"><News key="technology" pagesize={this.pagesize} country="in" category="technology" mode={this.state.mode} /> </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

