import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './containers/Home';
import Movie from './containers/Movie';

const App = () => {
  return (
    <div className='App'>
      <Switch>
        <Route path='/movie/:id' component={Movie}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
      {/* <Home /> */}
      {/* <Movie id={76341} /> */}
    </div>
  );
};

export default App;
