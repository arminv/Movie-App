import React, { useState, useEffect } from 'react';

import { fetch_by_id } from '../api/index';
import './Movie.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

// const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

const useStyles = makeStyles({
  card: {
    maxWidth: '15vw',
    border: '2px solid darkblue',
  },
  media: {
    maxWidth: '100%',
    height: 'auto',
  },
});

const Movie = ({ match }) => {
  const id = match.params.id;
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState({});

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

    async function getCast(id) {
      const cast = await fetch_by_id('CAST', id);

      setCast({
        cast,
      });
    }
    getCast(id);
  }, [id]);

  //   console.log('MOVIE:', movie);
  // console.log('CAST:', cast);

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
                  <CardMedia
                    className={classes.media}
                    component='img'
                    alt={`${movie.title}`}
                    height='500'
                    image={`${BASE_IMG_URL}${movie.poster_path}`}
                    title={`${movie.title}`}
                    onClick={() => {}}
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <h4>{movie.overview}</h4>
              <br />
              <p>Homepage: {movie.homepage}</p>
              <p>Budget: {movie.budget}</p>
              {/* <p>Genres: {movie.genres}</p> */}
              <p>Runtime: {movie.runtime}</p>
              <p>Revenue: {movie.revenue}</p>
              <p>Release Date: {movie.release_date}</p>
              <p>Vote Average: {movie.vote_average}</p>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Movie;
