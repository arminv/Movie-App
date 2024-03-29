import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getUserMovies,
  setLoading,
  addUserMovie,
  removeUserMovie,
} from '../redux/actions';
import { fetch_by_id } from '../api/index';

import './Movie.css';

import { motion } from 'framer-motion';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';
import TodayIcon from '@material-ui/icons/Today';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Tooltip from '@material-ui/core/Tooltip';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import Cards from '../components/Cards';
import Video from '../components/Video';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
const BASE_IMG_SMALL_URL = 'https://image.tmdb.org/t/p/w185';
const BASE_IMG_LARGE_URL = 'https://image.tmdb.org/t/p/w1280';

const useStyles = makeStyles({
  card: {
    // maxWidth: '20vw',
    border: '2px solid rgba(255, 174, 0, 0.7)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  media: {
    maxWidth: '100%',
    height: 'auto',
  },
  castCard: {
    maxWidth: '150px',
    // width: 'auto',
    border: '1px solid rgba(255, 174, 0, 0.7)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
  },
  castMedia: {
    maxWidth: '100%',
    height: 'auto',
  },
  castName: {
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'center',
    flexDirection: 'column',
  },
  castCharacter: {
    fontSize: '13px',
    textAlign: 'center',
  },
  infoChips: {
    backgroundColor: '#b7e2ed',
    margin: '5px',
  },
});

// Animations:
const movieNameVariants = {
  animationOne: {
    opacity: 0,
    rotate: -180,
    x: '-100vw',
  },
  animationTwo: {
    opacity: 1,
    rotate: 0,
    x: 0,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

const movieTagLineVariants = {
  animationOne: {
    opacity: 0,
    rotate: -180,
    x: '100vw',
  },
  animationTwo: {
    opacity: 1,
    rotate: 0,
    x: 0,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

const Movie = ({
  user,
  auth,
  userMovies,
  getUserMovies,
  setLoading,
  addUserMovie,
  removeUserMovie,
}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [images, setImages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState({});

  let alreadyAdded = false;
  for (const item in userMovies) {
    if (userMovies[item]['movies'] === +id) {
      alreadyAdded = true;
    }
  }

  const findAndRemoveMovie = (id, userId) => {
    let uid;
    for (const item in userMovies) {
      if (userMovies[item]['movies'] === +id) {
        uid = userMovies[item]['_id'];
      }
    }
    removeUserMovie(uid, userId);
  };

  useEffect(() => {
    // Scroll to top when page loads:
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (user) {
      getUserMovies(user._id);
      setLoading(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const getMovie = async (id) => {
      const {
        title,
        overview,
        poster_path,
        backdrop_path,
        homepage,
        genres,
        budget,
        runtime,
        revenue,
        release_date,
        vote_average,
        tagline,
      } = await fetch_by_id('MOVIE', id);

      setMovie({
        title,
        overview,
        poster_path,
        backdrop_path,
        homepage,
        genres,
        budget,
        runtime,
        revenue,
        release_date,
        vote_average,
        tagline,
      });
    };
    getMovie(id);

    const getRecommendations = async (id) => {
      setRecommendations(await fetch_by_id('RECOMMENDATIONS', id));
    };
    getRecommendations(id);

    const getImages = async (id) => {
      const images = await fetch_by_id('IMAGES', id);
      setImages({
        images,
      });
    };
    getImages(id);

    const getVideo = async (id) => {
      const videos = await fetch_by_id('VIDEOS', id);
      setVideos(videos);
    };
    getVideo(id);

    const getCast = async (id) => {
      const cast = await fetch_by_id('CAST', id);
      setCast({
        cast,
      });
    };
    getCast(id);
  }, [id]);

  let trailerUrl = [];
  for (const item of videos) {
    if (
      item['name'].toLowerCase().includes('trailer') &&
      item['site'].toLowerCase().includes('youtube')
    ) {
      trailerUrl.push(item['key']);
    }
  }

  const imageGallery = [];
  for (let item in images.images) {
    imageGallery.push({
      original: `${BASE_IMG_LARGE_URL}/${images.images[item]['file_path']}`,
      thumbnail: `${BASE_IMG_SMALL_URL}/${images.images[item]['file_path']}`,
    });
  }

  const minutesToHours = (runtime) => {
    let hrs = runtime / 60;
    let mins = (hrs - Math.floor(hrs)) * 60;
    let remHrs = Math.floor(hrs);
    let remMins = Math.round(mins);
    return remHrs + 'h ' + remMins + 'm';
  };

  const classes = useStyles();

  const castCards = [];
  for (let person in cast.cast) {
    castCards.push(
      <Grid item style={{ display: 'flex' }} xs={6} sm={3}>
        <a
          href={`https://www.google.com/search?q=${cast.cast[person]['name']}`}
          target='_blank'
          style={{ textDecoration: 'none' }}
          rel='noopener noreferrer'
        >
          <Card className={classes.castCard}>
            <CardMedia
              className={classes.castMedia}
              component='img'
              alt={`${movie.title}`}
              height='500'
              image={
                cast.cast[person]['profile_path']
                  ? `${BASE_IMG_URL}${cast.cast[person]['profile_path']}`
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              title={`${movie.title}`}
            />
            <CardContent>
              <Typography
                style={{ fontSize: '14px', wordWrap: 'break-word' }}
                gutterBottom
                variant='subtitle1'
                className={classes.castName}
              >
                {cast.cast[person]['name']}
              </Typography>
              <Typography
                style={{ fontSize: '12px', wordWrap: 'break-word' }}
                gutterBottom
                variant='subtitle2'
                className={classes.castCharacter}
              >
                {cast.cast[person]['character']}
              </Typography>
            </CardContent>
          </Card>
        </a>
      </Grid>
    );
  }

  const movieGenres =
    movie.genres &&
    Object.keys(movie.genres).map((item, index) => {
      return (
        <Chip
          label={movie.genres[item]['name']}
          size='small'
          key={index}
          style={{ backgroundColor: 'yellow' }}
        />
      );
    });

  const recommendationsCards =
    recommendations &&
    Object.keys(recommendations).map((item, index) => {
      return (
        <Grid className='cards' key={index} item style={{ display: 'flex' }}>
          <Cards
            id={recommendations[item]['id']}
            key={recommendations[item]['id']}
            recommend='true'
            compact='true'
          />
        </Grid>
      );
    });

  return (
    <div>
      <div className='movie'>
        <div
          id='background_wrap'
          style={{
            backgroundImage: `url(${BASE_IMG_URL + movie.backdrop_path})`,
          }}
        ></div>
        <div className='content'>
          <div className='heading'>
            <motion.h1
              variants={movieNameVariants}
              initial='animationOne'
              animate='animationTwo'
            >
              {movie.title}
            </motion.h1>
            {movie.tagline ? (
              <motion.h3
                variants={movieTagLineVariants}
                initial='animationOne'
                animate='animationTwo'
              >
                <i>"{movie.tagline}"</i>
              </motion.h3>
            ) : (
              <></>
            )}
          </div>
          <br />
          <br />
          <Grid container spacing={3} alignItems='stretch'>
            <Grid item xs={12} sm={3}>
              <Card className={classes.card}>
                {movie.homepage ? (
                  <CardActionArea>
                    <Link
                      target='_blank'
                      href={movie.homepage}
                      rel='noopener noreferrer'
                    >
                      <CardMedia
                        className={classes.media}
                        component='img'
                        alt={`${movie.title}`}
                        height='500'
                        image={
                          movie.poster_path
                            ? `${BASE_IMG_URL}${movie.poster_path}`
                            : 'https://critics.io/img/movies/poster-placeholder.png'
                        }
                        title={`${movie.title}`}
                      />
                    </Link>
                  </CardActionArea>
                ) : (
                  <CardMedia
                    className={classes.media}
                    component='img'
                    alt={`${movie.title}`}
                    height='500'
                    image={
                      movie.poster_path
                        ? `${BASE_IMG_URL}${movie.poster_path}`
                        : 'https://critics.io/img/movies/poster-placeholder.png'
                    }
                    title={`${movie.title}`}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={9}>
              <h4 style={{ marginTop: '50px', marginBottom: '30px' }}>
                {movie.overview}
              </h4>
              <br />
              <span>
                {movie.budget ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Budget : ${movie.budget.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    })}`}
                    icon={<LocalAtmIcon />}
                    size='medium'
                  />
                ) : null}
              </span>
              <span>
                {movie.revenue ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Revenue : ${movie.revenue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                    })}`}
                    icon={<AttachMoneyIcon />}
                    size='medium'
                  />
                ) : null}
              </span>
              <span>
                {movie.runtime ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Runtime : ${minutesToHours(movie.runtime)}`}
                    icon={<TimerIcon />}
                    size='medium'
                  />
                ) : null}
              </span>
              <span>
                {movie.release_date ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Release Date : ${movie.release_date}`}
                    icon={<TodayIcon />}
                    size='medium'
                  />
                ) : null}
              </span>
              <span>
                {movie.vote_average ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Rating : ${movie.vote_average}`}
                    icon={<ThumbUpIcon />}
                    size='medium'
                  />
                ) : null}
              </span>
              <br />
              <br />
              <span>{movieGenres}</span>
              <br />
              <br />
              <div style={{ padding: '1em 0em' }}>
                {alreadyAdded ? (
                  <Button
                    color='secondary'
                    variant='contained'
                    startIcon={<RemoveCircleOutlineIcon />}
                    onClick={() => {
                      findAndRemoveMovie(id, user._id);
                    }}
                  >
                    Remove From Cart
                  </Button>
                ) : auth ? (
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                      addUserMovie(id, user._id);
                    }}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Tooltip title='Please sign in to add movie to your list'>
                    <Button
                      color='primary'
                      variant='contained'
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={() => {}}
                    >
                      Add To Cart
                    </Button>
                  </Tooltip>
                )}
              </div>
            </Grid>
            {trailerUrl.length > 0 ? (
              <>
                <h2 style={{ marginTop: '50px', marginBottom: '30px' }}>
                  Trailer:
                </h2>
                <Grid item xs={12}>
                  <Video youtubeId={trailerUrl[0]} />
                </Grid>
              </>
            ) : (
              <></>
            )}
            {images.images && Object.keys(images.images).length !== 0 ? (
              <>
                <h2 style={{ marginTop: '50px', marginBottom: '30px' }}>
                  Gallery:
                </h2>
                <Grid item xs={12}>
                  <ImageGallery items={imageGallery} />
                </Grid>
              </>
            ) : (
              <></>
            )}
            {cast.cast && Object.keys(cast.cast).length ? (
              <>
                <h2 style={{ marginTop: '50px', marginBottom: '30px' }}>
                  Cast:
                </h2>
                <Grid
                  container
                  justify='center'
                  spacing={3}
                  alignItems='stretch'
                >
                  {castCards}
                </Grid>
              </>
            ) : null}
            {recommendations && Object.keys(recommendations).length ? (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ marginTop: '50px', marginBottom: '30px' }}>
                  Recommended Movies:
                </h2>
                <Grid
                  container
                  justify='center'
                  spacing={3}
                  alignItems='stretch'
                >
                  {recommendationsCards}
                </Grid>
              </div>
            ) : null}
          </Grid>
        </div>
      </div>
    </div>
  );
};

Movie.propTypes = {
  userMovies: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userMovies: state.moviesReducer.userMovies,
  user: state.authReducer.user,
  auth: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {
  getUserMovies,
  setLoading,
  addUserMovie,
  removeUserMovie,
})(Movie);
