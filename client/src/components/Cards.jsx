import React, { useState, useEffect } from 'react';
import { Link as LinkRoute } from 'react-router-dom';

import { fetch_by_id } from '../api/index';

import { connect } from 'react-redux';
import { addUserMovie } from '../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LanguageIcon from '@material-ui/icons/Language';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
  root: {
    maxWidth: '15vmax',
    border: '2px solid darkblue',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#191413',
    color: 'yellow',
  },
  media: {
    maxWidth: '100%',
    height: 'auto',
  },
});

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Cards = ({ id, recommend = 'false', addUserMovie }) => {
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
    return (
      <Chip
        label={genre}
        key={index}
        variant='outlined'
        size='small'
        style={{
          backgroundColor: '#8c5f26',
          color: 'white',
        }}
      />
    );
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {recommend !== 'true' ? (
          <LinkRoute to={`movie/${id}`} style={{ textDecoration: 'none' }}>
            <CardMedia
              className={classes.media}
              component='img'
              alt={`${movie.title}`}
              height='500'
              image={
                movie.poster_path
                  ? `${BASE_IMG_URL}${movie.poster_path}`
                  : 'https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png'
              }
              title={`${movie.title}`}
              onClick={() => {}}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant='subtitle1'
                style={{ color: 'whitesmoke' }}
              >
                {movie.title}
              </Typography>
              <br />
              <Grid
                container
                alignItems='center'
                // direction='column'
                justify='center'
                spacing={2}
              >
                {genreChips}
              </Grid>
            </CardContent>
          </LinkRoute>
        ) : (
          <LinkRoute to={`${id}`} style={{ textDecoration: 'none' }}>
            <CardMedia
              className={classes.media}
              component='img'
              alt={`${movie.title}`}
              height='500'
              image={
                movie.poster_path
                  ? `${BASE_IMG_URL}${movie.poster_path}`
                  : 'https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png'
              }
              title={`${movie.title}`}
              onClick={() => {}}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant='subtitle1'
                style={{ color: 'whitesmoke' }}
              >
                {movie.title}
              </Typography>
              <Grid
                container
                alignItems='center'
                // direction='column'
                justify='center'
              >
                {genreChips}
              </Grid>
            </CardContent>
          </LinkRoute>
        )}
      </CardActionArea>
      <CardActions>
        {movie.homepage ? (
          <Link target='_blank' href={movie.homepage} rel='noopener noreferrer'>
            <Button size='small' color='primary' style={{ color: 'white' }}>
              <LanguageIcon>Website</LanguageIcon>
            </Button>
          </Link>
        ) : (
          ''
        )}
        <Button
          size='small'
          color='primary'
          style={{ color: 'white', alignItems: 'flex-end' }}
          onClick={() => addUserMovie(id)}
        >
          <AddCircleOutlineIcon>Add Movie</AddCircleOutlineIcon>
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { addUserMovie })(Cards);

// export default Cards;
