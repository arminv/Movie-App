import React from 'react';
import logo from './logo.svg';
import './App.css';

import { fetch_movie_by_id, search_movies_by_name } from './api/index';

function App() {
  // fetch_a_movie(557);
  search_movies_by_name('mad');
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
