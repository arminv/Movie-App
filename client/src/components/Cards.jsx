import React, { useState, useEffect } from 'react';
import { Link as LinkRoute } from 'react-router-dom';

import { fetch_by_id } from '../api/index';

import { connect } from 'react-redux';
import { addUserMovie, removeUserMovie } from '../redux/actions';

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
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Container } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

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

const Cards = ({
  id,
  recommend = 'false',
  addUserMovie,
  userMovies,
  removeUserMovie,
  auth,
}) => {
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

  let alreadyAdded = false;
  for (const item in userMovies) {
    if (userMovies[item]['movies'] === id) {
      alreadyAdded = true;
    }
  }

  const AddButton = () => {
    return !auth ? (
      <Tooltip title='Please sign in to add movie to your list'>
        <Button
          size='small'
          color='primary'
          style={{ color: 'white', alignItems: 'flex-end' }}
          onClick={() => {
            return null;
          }}
        >
          <AddCircleOutlineIcon>Add Movie</AddCircleOutlineIcon>
        </Button>
      </Tooltip>
    ) : (
      <Button
        size='small'
        color='primary'
        style={{ color: 'white', alignItems: 'flex-end' }}
        onClick={() => {
          addUserMovie(id);
          window.location.reload(false);
        }}
      >
        <AddCircleOutlineIcon>Add Movie</AddCircleOutlineIcon>
      </Button>
    );
  };

  const findAndRemoveMovie = (id) => {
    let uid;
    for (const item in userMovies) {
      if (userMovies[item]['movies'] === id) {
        uid = userMovies[item]['_id'];
      }
    }
    removeUserMovie(uid);
  };

  const RemoveButton = () => {
    return (
      <Button
        size='small'
        color='primary'
        style={{ color: 'white', alignItems: 'flex-end' }}
        onClick={() => {
          findAndRemoveMovie(id);
          window.location.reload(false);
        }}
      >
        <RemoveCircleOutlineIcon>Remove Movie</RemoveCircleOutlineIcon>
      </Button>
    );
  };

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
        <Container>
          {movie.homepage ? (
            <Link
              target='_blank'
              href={movie.homepage}
              rel='noopener noreferrer'
            >
              <Button size='small' color='primary' style={{ color: 'white' }}>
                <LanguageIcon>Website</LanguageIcon>
              </Button>
            </Link>
          ) : (
            ''
          )}
          {alreadyAdded ? RemoveButton() : AddButton()}
        </Container>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    userMovies: state.moviesReducer.userMovies,
    auth: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addUserMovie, removeUserMovie })(
  Cards
);

// export default Cards;
