import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ButtonGroup, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';

import { fetch_movies } from '../api/index';

import { Cards } from '../components/Cards';

import { connect } from 'react-redux';
import {
  addTopRated,
  addPopular,
  addUpcoming,
  addNowPlaying,
} from '../redux/actions';

const Home = (props) => {
  const [selectedTab, setSelectedTab] = useState('POPULAR');
  const [page, setPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState({});
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});

  useEffect(() => {
    async function getPopularMovies(page) {
      const popularMoviesResponse = await fetch_movies('POPULAR', page);
      setPopularMovies(popularMoviesResponse);
      props.addPopular(page, popularMoviesResponse);
    }
    getPopularMovies(page);

    async function getNowPlayingMovies(page) {
      const nowPlayingMoviesResponse = await fetch_movies('NOW_PLAYING', page);
      setNowPlayingMovies(nowPlayingMoviesResponse);
      props.addNowPlaying(page, nowPlayingMoviesResponse);
    }
    getNowPlayingMovies(page);

    async function getTopRatedMovies(page) {
      const topRatedMoviesResponse = await fetch_movies('TOP_RATED', page);
      setTopRatedMovies(topRatedMoviesResponse);
      props.addTopRated(page, topRatedMoviesResponse);
    }
    getTopRatedMovies(page);

    async function getUpcomingMovies(page) {
      const upcomingMoviesResponse = await fetch_movies('UPCOMING', page);
      setUpcomingMovies(upcomingMoviesResponse);
      props.addUpcoming(page, upcomingMoviesResponse);
    }
    getUpcomingMovies(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <Container>
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
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    popular: state.moviesReducer.popular,
    nowPlaying: state.moviesReducer.nowPlaying,
    topRated: state.moviesReducer.topRated,
    upcoming: state.moviesReducer.upcoming,
  };
}

export default connect(mapStateToProps, {
  addTopRated,
  addNowPlaying,
  addPopular,
  addUpcoming,
})(Home);
// export default Home;
