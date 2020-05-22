import React, { useEffect, useState } from 'react';
import './App.css';

import {
  fetch_movie_by_id,
  fetch_popular_movies,
  search_movies_by_name,
} from './api/index';

import { Cards } from './components/Cards';

const App = () => {
  const [movie, setMovie] = useState({});
  const [popularMovies, setPopularMovies] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getMovie(id) {
      const {
        title,
        overview,
        poster_path,
        homepage,
        genres,
      } = await fetch_movie_by_id(id);
      setMovie({ id, title, overview, poster_path, homepage, genres });
    }
    getMovie(76341);

    async function getPopularMovies(page) {
      const popularMoviesResponse = await fetch_popular_movies(page);
      setPopularMovies(popularMoviesResponse);
    }
    getPopularMovies(page);
  }, [page]);

  console.log(popularMovies);

  return (
    <div className='App'>
      {/* <Cards movie={movie} /> */}
    </div>
  );
};

export default App;
