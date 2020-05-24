import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ButtonGroup, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import './App.css';

import {
  fetch_popular_movies,
  fetch_now_playing_movies,
  fetch_top_rated_movies,
  fetch_upcoming_movies,
  // search_movies_by_name,
} from './api/index';

import { Cards } from './components/Cards';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('POPULAR');
  const [page, setPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState({});
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});

  useEffect(() => {
    async function getPopularMovies(page) {
      const popularMoviesResponse = await fetch_popular_movies(page);
      setPopularMovies(popularMoviesResponse);
    }
    getPopularMovies(page);

    async function getNowPlayingMovies(page) {
      const nowPlayingMoviesResponse = await fetch_now_playing_movies(page);
      setNowPlayingMovies(nowPlayingMoviesResponse);
    }
    getNowPlayingMovies(page);

    async function getTopRatedMovies(page) {
      const topRatedMoviesResponse = await fetch_top_rated_movies(page);
      setTopRatedMovies(topRatedMoviesResponse);
    }
    getTopRatedMovies(page);

    async function getUpcomingMovies(page) {
      const upcomingMoviesResponse = await fetch_upcoming_movies(page);
      setUpcomingMovies(upcomingMoviesResponse);
    }
    getUpcomingMovies(page);
  }, [page]);

  // Get popular movies:
  const popularMovieCards = Object.keys(popularMovies).map((item, index) => {
    return (
      <Grid key={index} item style={{ display: 'flex' }}>
        <Cards id={popularMovies[item]['id']} key={index} />
      </Grid>
    );
  });

  // Get now-playing movies:
  const nowPlayingMovieCards = Object.keys(nowPlayingMovies).map(
    (item, index) => {
      return (
        <Grid key={index} item style={{ display: 'flex' }}>
          <Cards id={nowPlayingMovies[item]['id']} key={index} />
        </Grid>
      );
    }
  );

  // Get top-rated movies:
  const topRatedMovieCards = Object.keys(topRatedMovies).map((item, index) => {
    return (
      <Grid key={index} item style={{ display: 'flex' }}>
        <Cards id={topRatedMovies[item]['id']} key={index} />
      </Grid>
    );
  });

  // Get upcoming movies:
  const upcomingMovieCards = Object.keys(upcomingMovies).map((item, index) => {
    return (
      <Grid key={index} item style={{ display: 'flex' }}>
        <Cards id={upcomingMovies[item]['id']} key={index} />
      </Grid>
    );
  });

  const handleTabSwitch = (e) => {
    setPage(1);
    setSelectedTab(e.target.innerText);
  };

  return (
    <div className='App'>
      <ButtonGroup
        variant='contained'
        color='primary'
        aria-label='contained primary button group'
      >
        <Button onClick={handleTabSwitch}>Popular</Button>
        <Button onClick={handleTabSwitch}>Now Playing</Button>
        <Button onClick={handleTabSwitch}>Top Rated</Button>
        <Button onClick={handleTabSwitch}>Upcoming</Button>
      </ButtonGroup>

      <h1>{selectedTab}</h1>
      <Grid container spacing={2} alignItems='stretch'>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={3}>
            {(() => {
              switch (selectedTab) {
                case 'POPULAR':
                  return <>{popularMovieCards}</>;
                case 'NOW PLAYING':
                  return <>{nowPlayingMovieCards}</>;
                case 'TOP RATED':
                  return <>{topRatedMovieCards}</>;
                case 'UPCOMING':
                  return <>{upcomingMovieCards}</>;
                default:
                  return null;
              }
            })()}
          </Grid>
        </Grid>
      </Grid>
      <Pagination
        count={500}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};

export default App;
