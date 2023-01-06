import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=> {
 const swap = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "black"
    }
    else {
      setmode("light");
      document.body.style.backgroundColor = "white"

    }
  }
  const [mode, setmode] = useState("light");
  const [progress, setprogress] = useState(0);
  const pagesize = 5
  const apikey=process.env.REACT_APP_NEWS_API;
    return (
      <div>
        <Router>
          <Navbar swap={swap} mode={mode} />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <Switch>
            <Route exact path="/"><News setprogress={setprogress} apikey={apikey} key="general" pagesize={pagesize} country="in" category="general" mode={mode} /> </Route>
            <Route exact path="/Newsapp"><News setprogress={setprogress} apikey={apikey} key="general" pagesize={pagesize} country="in" category="general" mode={mode} /> </Route>
            <Route exact path="/business"><News setprogress={setprogress} apikey={apikey} key="business" pagesize={pagesize} country="in" category="business" mode={mode} /> </Route>
            <Route exact path="/entertainment"><News setprogress={setprogress} apikey={apikey} key="entertainment" pagesize={pagesize} country="in" category="entertainment" mode={mode} /> </Route>
            <Route exact path="/general"><News setprogress={setprogress} apikey={apikey} key="general" pagesize={pagesize} country="in" category="general" mode={mode} /> </Route>
            <Route exact path="/health"><News setprogress={setprogress} apikey={apikey} key="health" pagesize={pagesize} country="in" category="health" mode={mode} /> </Route>
            <Route exact path="/science"><News setprogress={setprogress} apikey={apikey} key="science" pagesize={pagesize} country="in" category="science" mode={mode} /> </Route>
            <Route exact path="/sports"><News setprogress={setprogress} apikey={apikey} key="sport" pagesize={pagesize} country="in" category="sports" mode={mode} /> </Route>
            <Route exact path="/technology"><News setprogress={setprogress} apikey={apikey} key="technology" pagesize={pagesize} country="in" category="technology" mode={mode} /> </Route>
          </Switch>
        </Router>
      </div>
    )
  
}
export default App;

