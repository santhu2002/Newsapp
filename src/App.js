import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


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
  state = {
    progress: 0,
  }
  setprogress = (progress) => {
    this.setState({ progress: progress })
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
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}

          />
          <Switch>
            <Route exact path="/"><News setprogress={this.setprogress} key="general" pagesize={this.pagesize} country="in" category="general" mode={this.state.mode} /> </Route>
            <Route exact path="/business"><News setprogress={this.setprogress} key="business" pagesize={this.pagesize} country="in" category="business" mode={this.state.mode} /> </Route>
            <Route exact path="/entertainment"><News setprogress={this.setprogress} key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" mode={this.state.mode} /> </Route>
            <Route exact path="/general"><News setprogress={this.setprogress} key="general" pagesize={this.pagesize} country="in" category="general" mode={this.state.mode} /> </Route>
            <Route exact path="/health"><News setprogress={this.setprogress} key="health" pagesize={this.pagesize} country="in" category="health" mode={this.state.mode} /> </Route>
            <Route exact path="/science"><News setprogress={this.setprogress} key="science" pagesize={this.pagesize} country="in" category="science" mode={this.state.mode} /> </Route>
            <Route exact path="/sports"><News setprogress={this.setprogress} key="sport" pagesize={this.pagesize} country="in" category="sports" mode={this.state.mode} /> </Route>
            <Route exact path="/technology"><News setprogress={this.setprogress} key="technology" pagesize={this.pagesize} country="in" category="technology" mode={this.state.mode} /> </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

