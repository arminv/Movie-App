import React from 'react';
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
    maxWidth: '20vw',
    border: '1px solid lightblue',
  },
  media: {
    maxWidth: '100%',
    height: 'auto',
  },
});

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const Cards = ({ movie }) => {
  const { title, poster_path, homepage, genres } = movie;

  // Extract the genre names without their ids:
  const genreNames = [];
  if (genres) {
    for (var i = 0; i < genres.length; i++) {
      genreNames.push(genres[i]['name']);
    }
  }

  const genreChips = genreNames.map((genre, index) => {
    return <Chip label={genre} key={index} variant='outlined' size='small' />;
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component='img'
          alt={`${title}`}
          height='500'
          image={`${BASE_IMG_URL}${poster_path}`}
          title={`${title}`}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          {genreChips}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link target='_blank' href={homepage} rel='noopener noreferrer'>
          <Button size='small' color='primary'>
            Website
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
