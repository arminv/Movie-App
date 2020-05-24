import React, { useState, useEffect } from 'react';

import { fetch_movie_by_id, fetch_cast } from '../api/index';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

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
        vote_aevrage,
      } = await fetch_movie_by_id(id);

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
        vote_aevrage,
      });
    }
    getMovie(id);

    async function getCast(id) {
      const cast = await fetch_cast(id);

      setCast({
        cast,
      });
    }
    getCast(id);
  }, [id]);

  //   console.log('MOVIE:', movie);
  //   console.log('CAST:', cast);
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>{movie.homepage}</p>
      <p>{movie.budget}</p>
    </div>
  );
};

export default Movie;
