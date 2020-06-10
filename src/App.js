import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Movie from './containers/Movie';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/movie/:id' component={Movie}></Route>
        <Route exact path='/:myPage?' component={Home}></Route>
      </Switch>
    </div>
  );
};

export default App;
