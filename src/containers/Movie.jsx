import React, { useState, useEffect } from 'react';

import { fetch_by_id } from '../api/index';
import './Movie.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

// const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
const BASE_IMG_SMALL_URL = 'https://image.tmdb.org/t/p/w185';
const BASE_IMG_LARGE_URL = 'https://image.tmdb.org/t/p/w1280';

const useStyles = makeStyles({
  card: {
    maxWidth: '20vw',
    border: '2px solid rgba(255, 174, 0, 0.7)',
  },
  media: {
    maxWidth: '100%',
    height: 'auto',
  },
});

const Movie = ({ match }) => {
  const id = match.params.id;
  const [movie, setMovie] = useState({});
  const [images, setImages] = useState({});
  const [cast, setCast] = useState({});

  useEffect(() => {
    // Scroll to top when page loads:
    window.scrollTo(0, 0);
  }, []);

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

  console.log('CAST:', cast);

  const classes = useStyles();
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
            {movie.tagline ? <h3>"{movie.tagline}"</h3> : ''}
          </div>
          <br />
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Card className={classes.card}>
                <CardActionArea>
                  {movie.homepage ? (
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
                        image={`${BASE_IMG_URL}${movie.poster_path}`}
                        title={`${movie.title}`}
                        onClick={() => {}}
                      />
                    </Link>
                  ) : (
                    <CardMedia
                      className={classes.media}
                      component='img'
                      alt={`${movie.title}`}
                      height='500'
                      image={`${BASE_IMG_URL}${movie.poster_path}`}
                      title={`${movie.title}`}
                      onClick={() => {}}
                    />
                  )}
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <h4>{movie.overview}</h4>
              <br />
              <p>Budget: {movie.budget}</p>
              {/* <p>Genres: {movie.genres}</p> */}
              <p>Runtime: {movie.runtime}</p>
              <p>Revenue: {movie.revenue}</p>
              <p>Release Date: {movie.release_date}</p>
              <p>Vote Average: {movie.vote_average}</p>
            </Grid>
            {images ? (
              <Grid item xs={12}>
                <ImageGallery items={imageGallery} />;
              </Grid>
            ) : null}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Movie;
