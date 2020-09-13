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
  getUserMovies,
} from '../redux/actions';

import Grid from '@material-ui/core/Grid';
import { ButtonGroup, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Pagination } from '@material-ui/lab';

import { motion } from 'framer-motion';

import Cards from '../components/Cards';

import './Home.css';

const buttongroupVariants = {
  animationOne: {
    opacity: 0,
  },
  animationTwo: {
    opacity: 1,
    transition: { duration: 2 },
  },
};

const Home = ({
  lastPage,
  user,
  getUserMovies,
  addPopular,
  addNowPlaying,
  addTopRated,
  addUpcoming,
  setLoading,
  popular,
  nowPlaying,
  topRated,
  upcoming,
  searchResults,
  searchPage,
  setLastPage,
  setSearchQuery,
  setSearchPage,
  searchQuery,
}) => {
  const { myPage } = useParams();
  let history = useHistory();

  const selectedTab = lastPage;
  const [page, setPage] = useState(parseInt(myPage) ? parseInt(myPage) : 1);

  useEffect(() => {
    if (user) {
      getUserMovies(user._id);
      setLoading(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const getPopularMovies = async (page) => {
      const [popularMoviesResponse, popularTotalPages] = await fetch_movies(
        'POPULAR',
        page
      );

      addPopular(page, popularMoviesResponse, popularTotalPages);
    };
    getPopularMovies(page);

    const getNowPlayingMovies = async (page) => {
      const [
        nowPlayingMoviesResponse,
        nowPlayingTotalPages,
      ] = await fetch_movies('NOW_PLAYING', page);

      addNowPlaying(page, nowPlayingMoviesResponse, nowPlayingTotalPages);
    };
    getNowPlayingMovies(page);

    const getTopRatedMovies = async (page) => {
      const [topRatedMoviesResponse, topRatedTotalPages] = await fetch_movies(
        'TOP_RATED',
        page
      );
      addTopRated(page, topRatedMoviesResponse, topRatedTotalPages);
    };
    getTopRatedMovies(page);

    const getUpcomingMovies = async (page) => {
      const [upcomingMoviesResponse, upcomingTotalPages] = await fetch_movies(
        'UPCOMING',
        page
      );
      addUpcoming(page, upcomingMoviesResponse, upcomingTotalPages);
    };
    getUpcomingMovies(page);

    setLoading(false);

    return () => {
      setLoading(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Popular movies card:
  const popularMovieCards =
    popular[page] &&
    Object.keys(popular[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={popular[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Now-playing movies cards:
  const nowPlayingMovieCards =
    nowPlaying[page] &&
    Object.keys(nowPlaying[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={nowPlaying[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Top-rated movies cards:
  const topRatedMovieCards =
    topRated[page] &&
    Object.keys(topRated[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={topRated[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Upcoming movies cards:
  const upcomingMovieCards =
    upcoming[page] &&
    Object.keys(upcoming[page]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={upcoming[page][item]['id']} key={index} />
        </Grid>
      );
    });

  // Upcoming movies cards:
  const searchResultsCards =
    searchResults[searchPage] &&
    Object.keys(searchResults[searchPage]).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards id={searchResults[searchPage][item]['id']} key={index} />
        </Grid>
      );
    });

  const handleTabSwitch = (event) => {
    handlePageChange(event, 1);
    setLastPage(event.target.innerText);
    setSearchQuery('');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    history.push(`/${value}`);
  };

  const handleSearchPageChange = (event, value) => {
    setSearchPage(value);
  };

  return (
    <motion.div
      className='App'
      variants={buttongroupVariants}
      initial='animationOne'
      animate='animationTwo'
    >
      <ButtonGroup
        className='tabs'
        variant='contained'
        color='primary'
        aria-label='contained primary button group'
        style={{ maxWidth: '90%' }}
      >
        <Button
          onClick={handleTabSwitch}
          color={selectedTab === 'POPULAR' ? 'secondary' : ''}
          style={{
            border: selectedTab === 'POPULAR' ? '1px solid orange' : '',
          }}
        >
          Popular
        </Button>
        <Button
          onClick={handleTabSwitch}
          color={selectedTab === 'NOW PLAYING' ? 'secondary' : ''}
          style={{
            border: selectedTab === 'NOW PLAYING' ? '1px solid orange' : '',
          }}
        >
          Now Playing
        </Button>
        <Button
          onClick={handleTabSwitch}
          color={selectedTab === 'TOP RATED' ? 'secondary' : ''}
          style={{
            border: selectedTab === 'TOP RATED' ? '1px solid orange' : '',
          }}
        >
          Top Rated
        </Button>
        <Button
          onClick={handleTabSwitch}
          color={selectedTab === 'UPCOMING' ? 'secondary' : ''}
          style={{
            border: selectedTab === 'UPCOMING' ? '1px solid orange' : '',
          }}
        >
          Upcoming
        </Button>
      </ButtonGroup>

      <h1>
        {searchQuery !== '' ? `RESULTS FOR: ${searchQuery}` : selectedTab}
      </h1>

      <Container>
        <Grid container alignItems='stretch' direction='row' justify='center'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {searchQuery !== '' ? (
              <Grid container justify='center' spacing={3}>
                {searchResultsCards}
              </Grid>
            ) : (
              <Grid container justify='center' spacing={3}>
                {(() => {
                  switch (selectedTab) {
                    case 'POPULAR':
                      return (
                        <>{popular[page] ? popularMovieCards : 'Loading...'}</>
                      );
                    case 'NOW PLAYING':
                      return (
                        <>
                          {nowPlaying[page]
                            ? nowPlayingMovieCards
                            : 'Loading...'}
                        </>
                      );
                    case 'TOP RATED':
                      return (
                        <>
                          {topRated[page] ? topRatedMovieCards : 'Loading...'}
                        </>
                      );
                    case 'UPCOMING':
                      return (
                        <>
                          {upcoming[page] ? upcomingMovieCards : 'Loading...'}
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

        <div style={{ marginBottom: '50px' }}>
          {searchQuery !== '' ? (
            <Pagination
              size='large'
              color='primary'
              variant='outlined'
              count={searchResults.totalPages}
              page={searchPage}
              onChange={(event, value) => handleSearchPageChange(event, value)}
            />
          ) : (
            <>
              {selectedTab === 'POPULAR' && (
                <Pagination
                  size='large'
                  color='primary'
                  variant='outlined'
                  count={popular.totalPages}
                  page={page}
                  onChange={(event, value) => handlePageChange(event, value)}
                />
              )}
              {selectedTab === 'NOW PLAYING' && (
                <Pagination
                  size='large'
                  color='primary'
                  variant='outlined'
                  count={nowPlaying.totalPages}
                  page={page}
                  onChange={(event, value) => handlePageChange(event, value)}
                />
              )}
              {selectedTab === 'TOP RATED' && (
                <Pagination
                  size='large'
                  color='primary'
                  variant='outlined'
                  count={topRated.totalPages}
                  page={page}
                  onChange={(event, value) => handlePageChange(event, value)}
                />
              )}
              {selectedTab === 'UPCOMING' && (
                <Pagination
                  size='large'
                  color='primary'
                  variant='outlined'
                  count={upcoming.totalPages}
                  page={page}
                  onChange={(event, value) => handlePageChange(event, value)}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    popular: state.moviesReducer.popular,
    nowPlaying: state.moviesReducer.nowPlaying,
    topRated: state.moviesReducer.topRated,
    upcoming: state.moviesReducer.upcoming,
    lastPage: state.lastPageReducer.lastPage,
    searchPage: state.lastPageReducer.searchPage,
    searchResults: state.searchReducer.searchResults,
    searchQuery: state.searchReducer.searchQuery,
    userMovies: state.moviesReducer.userMovies,
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps, {
  addTopRated,
  addNowPlaying,
  addPopular,
  addUpcoming,
  setLoading,
  setLastPage,
  setSearchPage,
  setSearchQuery,
  getUserMovies,
})(Home);
