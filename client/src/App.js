import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Movie from './containers/Movie';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/movie/:id' component={Movie}></Route>
          <Route exact path='/:myPage?' component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
