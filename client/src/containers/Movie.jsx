import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetch_by_id } from '../api/index';

import './Movie.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimerIcon from '@material-ui/icons/Timer';
import TodayIcon from '@material-ui/icons/Today';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Cards } from '../components/Cards';

// const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
const BASE_IMG_SMALL_URL = 'https://image.tmdb.org/t/p/w185';
const BASE_IMG_LARGE_URL = 'https://image.tmdb.org/t/p/w1280';

const useStyles = makeStyles({
  card: {
    maxWidth: '20vw',
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
    maxWidth: '10vmax',
    border: '2px solid rgba(255, 174, 0, 0.7)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  castMedia: {
    maxWidth: '100%',
    height: 'auto',
  },
  castName: {
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
  },
  castCharacter: {
    fontSize: '13px',
    textAlign: 'center',
  },
  infoChips: {
    backgroundColor: '#b7e2ed',
  },
});

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [images, setImages] = useState({});
  const [cast, setCast] = useState({});

  useEffect(() => {
    // Scroll to top when page loads:
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function getMovie(id) {
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
    }
    getMovie(id);

    async function getRecommendations(id) {
      setRecommendations(await fetch_by_id('RECOMMENDATIONS', id));
    }
    getRecommendations(id);

    async function getImages(id) {
      const images = await fetch_by_id('IMAGES', id);
      setImages({
        images,
      });
    }
    getImages(id);

    async function getCast(id) {
      const cast = await fetch_by_id('CAST', id);
      setCast({
        cast,
      });
    }
    getCast(id);
  }, [id]);

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
    let remHrs = hrs.toFixed(0);
    let remMins = Math.round(mins);
    return remHrs + 'h ' + remMins + 'm';
  };

  const classes = useStyles();

  const castCards = [];
  for (let person in cast.cast) {
    castCards.push(
      <Grid
        item
        xs={6}
        sm={3}
        md={2}
        lg={2}
        xl={2}
        style={{ display: 'flex' }}
        key={person}
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
              gutterBottom
              variant='h6'
              component='h2'
              className={classes.castName}
            >
              {cast.cast[person]['name']}
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle2'
              component='h2'
              className={classes.castCharacter}
            >
              {cast.cast[person]['character']}
            </Typography>
          </CardContent>
        </Card>
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
            key={index}
            recommend='true'
          />
        </Grid>
      );
    });

  return (
    <div>
      <div
        className='movie'
        style={{
          backgroundImage: `url(${BASE_IMG_URL + movie.backdrop_path})`,
        }}
      >
        <div className='content'>
          <div className='heading'>
            <h1>{movie.title}</h1>
            {movie.tagline ? <h3>"{movie.tagline}"</h3> : <></>}
          </div>
          <br />
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3}>
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
            <Grid item xs={9}>
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
                    size='small'
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
                    size='small'
                  />
                ) : null}
              </span>
              <span>
                {movie.revenue ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Runtime : ${minutesToHours(movie.runtime)}`}
                    icon={<TimerIcon />}
                    size='small'
                  />
                ) : null}
              </span>
              <span>
                {movie.release_date ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Release Date : ${movie.release_date}`}
                    icon={<TodayIcon />}
                    size='small'
                  />
                ) : null}
              </span>
              <span>
                {movie.vote_average ? (
                  <Chip
                    className={classes.infoChips}
                    label={`Vote Average : ${movie.vote_average}`}
                    icon={<ThumbUpIcon />}
                    size='small'
                  />
                ) : null}
              </span>
              <span>{movieGenres}</span>
            </Grid>
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
              <>
                <h2 style={{ marginTop: '50px', marginBottom: '30px' }}>
                  Recommendations:
                </h2>
                <Grid
                  container
                  justify='center'
                  spacing={3}
                  alignItems='stretch'
                >
                  {recommendationsCards}
                </Grid>
              </>
            ) : null}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Movie;