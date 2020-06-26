import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Movie from './containers/Movie';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/movie/:id' component={Movie}></Route>
        <Route exact path='/:myPage?' component={Home}></Route>
      </Switch>
    </div>
  );
};

export default App;