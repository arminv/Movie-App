import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/actions';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';

const Movie = lazy(() => import('./containers/Movie'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const AlertBar = lazy(() => import('./components/AlertBar'));
const Cart = lazy(() => import('./containers/Cart'));
const PrivateRoute = lazy(() => import('./components/routing/PrivateRoute'));

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Suspense fallback={<LinearProgress style={{ height: '20px' }} />}>
          <Navbar />
          <AlertBar />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/movie/:id' component={Movie} />
            <PrivateRoute exact path='/cart' component={Cart} />
            <Route exact path='/:myPage?' component={Home} />
          </Switch>
          <h3
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px 0px',
              fontSize: '16px',
              backgroundColor: 'transparent',
            }}
          >
            @2022 by
            <a
              href='https://www.arminvarshokar.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Armin Varshokar
            </a>
          </h3>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
