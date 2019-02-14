import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Search from './components/Search';
import { routing } from './utils/routing';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path={routing.search.value} component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
