import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { fetch_movies } from '../api/index';

import { connect } from 'react-redux';
import {
  addTopRated,
  addPopular,
  addUpcoming,
  addNowPlaying,
  setLoading,
  setLastPage,
  setSearchPage,
  setSearchQuery,
} from '../redux/actions';

import Grid from '@material-ui/core/Grid';
import { ButtonGroup, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';

import { Cards } from '../components/Cards';

import './Home.css';

const Home = (props) => {
  const { myPage } = useParams();
  const history = useHistory();

  const selectedTab = props.lastPage;
  const [page, setPage] = useState(parseInt(myPage) ? parseInt(myPage) : 1);

  useEffect(() => {
    async function getPopularMovies(page) {
      const [popularMoviesResponse, popularTotalPages] = await fetch_movies(
        'POPULAR',
        page
      );

      props.addPopular(page, popularMoviesResponse, popularTotalPages);
    }
    getPopularMovies(page);

    async function getNowPlayingMovies(page) {
      const [
        nowPlayingMoviesResponse,
        nowPlayingTotalPages,
      ] = await fetch_movies('NOW_PLAYING', page);

      props.addNowPlaying(page, nowPlayingMoviesResponse, nowPlayingTotalPages);
    }
    getNowPlayingMovies(page);

    async function getTopRatedMovies(page) {
      const [topRatedMoviesResponse, topRatedTotalPages] = await fetch_movies(
        'TOP_RATED',
        page
      );
      props.addTopRated(page, topRatedMoviesResponse, topRatedTotalPages);
    }
    getTopRatedMovies(page);

    async function getUpcomingMovies(page) {
      const [upcomingMoviesResponse, upcomingTotalPages] = await fetch_movies(
        'UPCOMING',
        page
      );
      props.addUpcoming(page, upcomingMoviesResponse, upcomingTotalPages);
    }
    getUpcomingMovies(page);

    props.setLoading(false);

    return () => {
      props.setLoading(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Popular movies card:
  const popularMovieCards =
    props.popular[page] &&
    Object.keys(props.popular[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={props.popular[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Now-playing movies cards:
  const nowPlayingMovieCards =
    props.nowPlaying[page] &&
    Object.keys(props.nowPlaying[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={props.nowPlaying[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Top-rated movies cards:
  const topRatedMovieCards =
    props.topRated[page] &&
    Object.keys(props.topRated[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={props.topRated[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Upcoming movies cards:
  const upcomingMovieCards =
    props.upcoming[page] &&
    Object.keys(props.upcoming[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={props.upcoming[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Upcoming movies cards:
  const searchResultsCards =
    props.searchResults[props.searchPage] &&
    Object.keys(props.searchResults[props.searchPage]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards
            id={props.searchResults[props.searchPage][item]['id']}
            key={index}
          />
        </Grid>
      );
    });

  const handleTabSwitch = (event) => {
    handlePageChange(event, 1);
    props.setLastPage(event.target.innerText);
    props.setSearchQuery('');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    history.push(`/${value}`);
  };

  const handleSearchPageChange = (event, value) => {
    props.setSearchPage(value);
  };

  return (
    <div className='App'>
      <ButtonGroup
        className='tabs'
        variant='contained'
        color='primary'
        aria-label='contained primary button group'
      >
        <Button onClick={handleTabSwitch}>Popular</Button>
        <Button onClick={handleTabSwitch}>Now Playing</Button>
        <Button onClick={handleTabSwitch}>Top Rated</Button>
        <Button onClick={handleTabSwitch}>Upcoming</Button>
      </ButtonGroup>

      <h1>
        {props.searchQuery !== ''
          ? `RESULTS FOR: ${props.searchQuery}`
          : selectedTab}
      </h1>

      <Container>
        <Grid
          container
          alignItems='stretch'
          direction='row'
          justify='center'
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {props.searchQuery !== '' ? (
              <Grid container justify='center' spacing={3}>
                {searchResultsCards}
              </Grid>
            ) : (
              <Grid container justify='center' spacing={3}>
                {(() => {
                  switch (selectedTab) {
                    case 'POPULAR':
                      return (
                        <>
                          {props.popular[page]
                            ? popularMovieCards
                            : 'Loading...'}
                        </>
                      );
                    case 'NOW PLAYING':
                      return (
                        <>
                          {props.nowPlaying[page]
                            ? nowPlayingMovieCards
                            : 'Loading...'}
                        </>
                      );
                    case 'TOP RATED':
                      return (
                        <>
                          {props.topRated[page]
                            ? topRatedMovieCards
                            : 'Loading...'}
                        </>
                      );
                    case 'UPCOMING':
                      return (
                        <>
                          {props.upcoming[page]
                            ? upcomingMovieCards
                            : 'Loading...'}
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </Grid>
            )}
          </Grid>
        </Grid>

        {props.searchQuery !== '' ? (
          <Pagination
            size='large'
            color='primary'
            variant='outlined'
            count={props.searchResults.totalPages}
            page={props.searchPage}
            onChange={(event, value) => handleSearchPageChange(event, value)}
          />
        ) : (
          <>
            {selectedTab === 'POPULAR' && (
              <Pagination
                size='large'
                color='primary'
                variant='outlined'
                count={props.popular.totalPages}
                page={page}
                onChange={(event, value) => handlePageChange(event, value)}
              />
            )}
            {selectedTab === 'NOW PLAYING' && (
              <Pagination
                size='large'
                color='primary'
                variant='outlined'
                count={props.nowPlaying.totalPages}
                page={page}
                onChange={(event, value) => handlePageChange(event, value)}
              />
            )}
            {selectedTab === 'TOP RATED' && (
              <Pagination
                size='large'
                color='primary'
                variant='outlined'
                count={props.topRated.totalPages}
                page={page}
                onChange={(event, value) => handlePageChange(event, value)}
              />
            )}
            {selectedTab === 'UPCOMING' && (
              <Pagination
                size='large'
                color='primary'
                variant='outlined'
                count={props.upcoming.totalPages}
                page={page}
                onChange={(event, value) => handlePageChange(event, value)}
              />
            )}
          </>
        )}
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
    isLoading: state.moviesReducer.isLoading,
    lastPage: state.lastPageReducer.lastPage,
    searchPage: state.lastPageReducer.searchPage,
    searchResults: state.searchReducer.searchResults,
    searchQuery: state.searchReducer.searchQuery,
  };
}

export default connect(mapStateToProps, {
  addTopRated,
  addNowPlaying,
  addPopular,
  addUpcoming,
  setLoading,
  setLastPage,
  setSearchPage,
  setSearchQuery,
})(Home);
