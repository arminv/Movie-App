import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';

import { fetch_popular_movies, search_movies_by_name } from './api/index';

import { Cards } from './components/Cards';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const App = () => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

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
    console.log(popularMovies[item]);
    return (
      <Grid key={index} item>
        <Cards id={popularMovies[item]['id']} key={index} />
      </Grid>
    );
  });

  return (
    <div className='App'>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={spacing}>
            {popularMovieCards}
          </Grid>
        </Grid>
      </Grid>
      {/* <Cards id={76341} /> */}
    </div>
  );
};

export default App;
