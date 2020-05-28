import React, { useState, useEffect } from 'react';

import { fetch_by_id } from '../api/index';
import './Movie.css';

// const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

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
  console.log('CAST:', cast);
  return (
    <div>
      <div
        className='container'
        style={{
          backgroundImage: `url(${BASE_IMG_URL + movie.poster_path})`,
        }}
      ></div>
      <div className='movie'>
        <h1>{movie.title}</h1>
        <h4>{movie.overview}</h4>
        <p>Homepage: {movie.homepage}</p>
        <p>Budget: {movie.budget}</p>
        <p>Poster Path: {movie.poster_path}</p>
        <p>Backdrop Path: {movie.backdrop_path}</p>
        {/* <p>Genres: {movie.genres}</p> */}
        <p>Runtime: {movie.runtime}</p>
        <p>Revenue: {movie.revenue}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Vote Average: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default Movie;
