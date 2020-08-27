import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import { loadUser } from './redux/actions';

import LinearProgress from '@material-ui/core/LinearProgress';

import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./containers/Home'));
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
        <Suspense fallback={<LinearProgress />}>
          <Navbar />
          <AlertBar />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/movie/:id' component={Movie} />
            <PrivateRoute exact path='/cart' component={Cart} />
            <Route exact path='/:myPage?' component={Home} />
          </Switch>
          <p
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '10px 0px',
              fontSize: '16px',
              backgroundColor: 'transparent',
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
