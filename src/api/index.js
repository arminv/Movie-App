import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org';
const HEADERS = {
    // 'Authorization': `Bearer ${API_KEY}`,
  'content-type': 'Content-Type: application/json;charset=utf-8',
};

export const fetch_movie_by_id = async (id) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// POPULAR MOVIES:
export const fetch_popular_movies = async (page) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&page=${page}`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
};

// NOW-PLAYING MOVIES:
export const fetch_now_playing_movies = async (page) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/now_playing?api_key=${API_KEY}&page=${page}`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
};

// TOP-RATED MOVIES:
export const fetch_top_rated_movies = async (page) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/top_rated?api_key=${API_KEY}&page=${page}`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
};

// UPCOMING MOVIES:
export const fetch_upcoming_movies = async (page) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/upcoming?api_key=${API_KEY}&page=${page}`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.log(error);
    });
};

// UPCOMING MOVIES:
export const fetch_cast = async (id) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/${id}/credits?api_key=${API_KEY}`,
    headers: HEADERS,
  })
    .then((response) => {
      return response.data.cast;
    })
    .catch((error) => {
      console.log(error);
    });
};




// TODO:
export const search_movies_by_name = async (query) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/search/company?api_key=${API_KEY}&query=${query}`,
    headers: HEADERS,
  })
    .then((response) => {
      // console.log('fetch_all_countries -> response', response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
