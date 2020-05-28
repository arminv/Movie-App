import React, { useState, useEffect } from 'react';
import { fetch_by_id } from '../api/index';

import { Link as LinkRoute } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  root: {
    maxWidth: '15vw',
    border: '2px solid lightblue',
  },
  media: {
    maxWidth: '100%',
    height: 'auto',
  },
});

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const Cards = ({ id }) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getMovie(id) {
      const {
        title,
        overview,
        poster_path,
        homepage,
        genres,
      } = await fetch_by_id('MOVIE', id);

      setMovie({ id, title, overview, poster_path, homepage, genres });
    }
    getMovie(id);
  }, [id]);

  // Extract the genre names without their ids:
  const genreNames = [];
  if (movie.genres) {
    for (var i = 0; i < movie.genres.length; i++) {
      genreNames.push(movie.genres[i]['name']);
    }
  }

  const genreChips = genreNames.map((genre, index) => {
    return <Chip label={genre} key={index} variant='outlined' size='small' />;
  });

  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardActionArea>
        <LinkRoute to={`movie/${id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            className={classes.media}
            component='img'
            alt={`${movie.title}`}
            height='500'
            image={`${BASE_IMG_URL}${movie.poster_path}`}
            title={`${movie.title}`}
            onClick={() => {}}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {movie.title}
            </Typography>
            {genreChips}
          </CardContent>
        </LinkRoute>
      </CardActionArea>
      <CardActions>
        <Link target='_blank' href={movie.homepage} rel='noopener noreferrer'>
          <Button size='small' color='primary'>
            Website
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
