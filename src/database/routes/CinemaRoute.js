import express from 'express';
import {
  get_all_movies,
  add_movie,
  getMovieById,
  updateSeats,
  clearTable,
  removeMovieById,
} from '../controller/DB_controller.js';

const movieRouter = express.Router();

movieRouter.post('/addMovie', async (req, res) => {
  const {
    movieName,
    movieDatePresentation,
    movieTimePresentation,
    movieTicketPrice,
    movieNumberHall,
    movieUnoccupiedSeats,
  } = req.body;

  const movieObj = {
    movieName: movieName,
    movieDatePresentation: movieDatePresentation,
    movieTimePresentation: movieTimePresentation,
    movieTicketPrice: movieTicketPrice,
    movieNumberHall: movieNumberHall,
    movieUnoccupiedSeats: movieUnoccupiedSeats,
  };

  const queryResult = await add_movie(movieObj);
  return await returnResponse(queryResult, res);
});

movieRouter.put('/updateSeats', async (req, res) => {
  const { movieName, currentMovieUnoccupiedSeats } = req.body;
  const movieObj = {
    movieName: movieName,
    currentMovieUnoccupiedSeats: currentMovieUnoccupiedSeats,
  };
  const queryResult = await updateSeats(movieObj);
  return await returnResponse(queryResult, res);
});

movieRouter.get('/allMovies', async (req, res) => {
  const queryResult = await get_all_movies();
  return await returnResponse(queryResult, res);
});

const returnResponse = async (responseContent, res) => {
  console.log(responseContent);
  return res.status(200).json(responseContent);
};

export default movieRouter;
