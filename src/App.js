import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';

import { fetch_popular_movies, search_movies_by_name } from './api/index';

import { Cards } from './components/Cards';

const App = () => {
  const [popularMovies, setPopularMovies] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getPopularMovies(page) {
      const popularMoviesResponse = await fetch_popular_movies(page);
      setPopularMovies(popularMoviesResponse);
    }
    getPopularMovies(page);
  }, [page]);

  // Get popular movies:
  const popularMovieCards = Object.keys(popularMovies).map((item, index) => {
    return (
      <Grid key={index} item style={{ display: 'flex' }}>
        <Cards id={popularMovies[item]['id']} key={index} />
      </Grid>
    );
  });

  return (
    <div className='App'>
      <Grid container spacing={2} alignItems='stretch'>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={3}>
            {popularMovieCards}
          </Grid>
        </Grid>
      </Grid>
      {/* <Cards id={76341} /> */}
    </div>
  );
};

export default App;
