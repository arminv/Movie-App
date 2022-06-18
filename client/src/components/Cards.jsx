import React, { useState, useEffect } from 'react';
import { Link as LinkRoute } from 'react-router-dom';
import { fetch_by_id } from '../api/index';
import { connect } from 'react-redux';
import { addUserMovie, removeUserMovie } from '../redux/actions';
import RatingStars from './Rating';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
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
import CardButtons from './CardButtons';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
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
  rootCompact: {
    maxWidth: 200,
    border: '2px solid darkblue',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#191413',
    color: 'red',
  },
});

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Cards = ({
  id,
  recommend = 'false',
  userMovies,
  removeUserMovie,
  cart,
  compact,
}) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async (id) => {
      const { title, overview, poster_path, homepage, genres, vote_average } =
        (await fetch_by_id('MOVIE', id)) || {};

      setMovie({
        id,
        title,
        overview,
        poster_path,
        homepage,
        genres,
        vote_average,
      });
    };
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

  const findAndRemoveMovie = (id, userId) => {
    let uid;
    for (const item in userMovies) {
      if (userMovies[item]['movies'] === id) {
        uid = userMovies[item]['_id'];
      }
    }
    removeUserMovie(uid, userId);
  };

  const classes = useStyles();

  return (
    <Card className={compact ? classes.rootCompact : classes.root}>
      <CardActionArea>
        <LinkRoute
          to={recommend !== 'true' ? `movie/${id}` : `${id}`}
          style={{ textDecoration: 'none' }}
        >
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
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='subtitle1'
              style={{ color: 'whitesmoke' }}
              justify='center'
            >
              {movie.title}
            </Typography>
            <RatingStars
              voteAverage={
                movie.vote_average && movie.vote_average !== 0
                  ? movie.vote_average
                  : null
              }
            />
            <br />
            <Grid container alignItems='center' justify='center'>
              {genreChips}
            </Grid>
          </CardContent>
        </LinkRoute>
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
          <CardButtons
            removeBtn={alreadyAdded ? true : false}
            addBtn={alreadyAdded ? false : true}
            findAndRemoveMovie={findAndRemoveMovie}
            id={id}
            cart={cart}
          />
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
