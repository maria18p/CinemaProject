import {
  all_movies,
  insert_movie,
  get_movie_byId,
  update_unoccupied_seats,
  remove_movie_by_id,
  clear_all_movies,
} from '../model/Movies.js';

export const get_all_movies = async () => {
  try {
    return await all_movies();
  } catch (err) {
    console.log(err);
  }
};

export const add_movie = async (movieObj) => {
  try {
    return await insert_movie(movieObj);
  } catch (err) {
    console.log(err);
  }
};

export const getMovieById = async (movieObj) => {
  try {
    return get_movie_byId(movieObj);
  } catch (err) {
    console.log(err);
  }
};

export const updateSeats = async (movieObj) => {
  try {
    return update_unoccupied_seats(movieObj);
  } catch (err) {
    console.log(err);
  }
};

export const clearTable = async () => {
  try {
    return clear_all_movies();
  } catch (err) {
    console.log(err);
  }
};

export const removeMovieById = async (movieObj) => {
  try {
    return remove_movie_by_id(movieObj);
  } catch (err) {
    console.log(err);
  }
};
