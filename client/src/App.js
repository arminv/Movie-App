import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/actions';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Movie from './containers/Movie';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AlertBar from './components/AlertBar';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <AlertBar />
        <Switch>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/movie/:id' component={Movie}></Route>
          <Route exact path='/:myPage?' component={Home}></Route>
        </Switch>
        <p
          style={{
            color: 'white',
            textDecoration: 'none',
            marginBottom: '10px',
            fontSize: '16px',
          }}
        >
          @2020 by{' '}
          <a
            href='https://www.arminvarshokar.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Armin Varshokar
          </a>
        </p>
      </div>
    </BrowserRouter>
  );
};

export default App;
