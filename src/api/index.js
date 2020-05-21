import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/';
const HEADERS = {
  //   'Authorization': `Bearer ${API_KEY}`,
  'content-type': 'Content-Type: application/json;charset=utf-8',
};

export const fetch_movie_by_id = async (id) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`,
    headers: HEADERS,
  })
    .then((response) => {
      console.log('fetch_all_countries -> response', response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const search_movies_by_name = async (query) => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}/3/search/company?api_key=${API_KEY}&query=${query}`,
    headers: HEADERS,
  })
    .then((response) => {
      console.log('fetch_all_countries -> response', response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
