import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org';
const HEADERS = {
  // 'Authorization': `Bearer ${API_KEY}`,
  'content-type': 'Content-Type: application/json;charset=utf-8',
};

// Fetch movie or cast by movie id:
// TODO: Fetch images for each movie
export const fetch_by_id = async (type, id) => {
  switch (type) {
    case 'MOVIE': {
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
    }
    case 'IMAGES': {
      return await axios({
        method: 'GET',
        url: `${BASE_URL}/3/movie/${id}/images?api_key=${API_KEY}`,
        headers: HEADERS,
      })
        .then((response) => {
          return response.data.backdrops;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    case 'CAST': {
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
    }
    default:
      return null;
  }
};

export const fetch_movies = async (type, page) => {
  switch (type) {
    // POPULAR MOVIES:
    case 'POPULAR': {
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
    }
    // NOW-PLAYING MOVIES:
    case 'NOW_PLAYING': {
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
    }
    // TOP-RATED MOVIES:
    case 'TOP_RATED': {
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
    }
    // UPCOMING MOVIES:
    case 'UPCOMING': {
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
    }
    default:
      return null;
  }
};

// -----------------------------------
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
