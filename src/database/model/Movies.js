import sequelize from 'sequelize';
import database from './Connection.js';

const Cinema_movie_schema = database.define('movies', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  movieName: sequelize.STRING,
  movieDatePresentation: sequelize.DATEONLY,
  movieTimePresentation: sequelize.TIME,
  movieTicketPrice: sequelize.DOUBLE,
  movieNumberHall: sequelize.STRING,
  movieUnoccupiedSeats: sequelize.INTEGER,
});

export const tableExists = async () => {
  console.log("VALIDATION 'movies' TABLE");
  return await Cinema_movie_schema.findAll({})
    .then(async () => {
      return true;
    })
    .catch((err) => {
      throw err;
    });
};

export const all_movies = async () => {
  if (!tableExists()) throw TABLE_NOT_FOUND_ERR;
  console.log('GETTING ALL MOVIES');
  return await Cinema_movie_schema.findAll({})
    .then(async (rows) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });
};

export const insert_movie = async (movieObj) => {
  if (!tableExists()) throw TABLE_NOT_FOUND_ERR;
  console.log(movieObj);
  const result = Cinema_movie_schema.create({
    movieName: movieObj.movieName,
    movieDatePresentation: movieObj.movieDatePresentation,
    movieTimePresentation: movieObj.movieTimePresentation,
    movieTicketPrice: movieObj.movieTicketPrice,
    movieNumberHall: movieObj.movieNumberHall,
    movieUnoccupiedSeats: movieObj.movieUnoccupiedSeats,
  })
    .then((added_movie) => {
      return { message: `Added movie ${added_movie.movieName}` };
    })
    .catch((err) => {
      throw err;
    });
  return await result;
};

export const get_movie_byId = async (movieObj) => {
  const result = await Cinema_movie_schema.findByPk(movieObj.id)
    .then(async (row) => {
      return row;
    })
    .catch((err) => {
      throw err;
    });
  return result;
};

export const update_unoccupied_seats = async (movieObj) => {
  console.log(movieObj);
  console.log(`UPDATING UNOCCUPIED SEATS ${movieObj.currentMovieUnoccupiedSeats} `);
  const update_result = Cinema_movie_schema.update(
    { movieUnoccupiedSeats: movieObj.currentMovieUnoccupiedSeats },
    { where: { movieNumberHall: movieObj.movieNumberHall } },
  )
    .then(async (updated_seats) => {
      return {
        message: `Unoccupied seats updated from ${movieObj.movieUnoccupiedSeats} seats to ${movieObj.currentMovieUnoccupiedSeats}`,
      };
    })
    .catch((err) => {
      throw err;
    });
  return update_result;
};

export const remove_movie_by_id = (movieObj) => {
  if (!tableExists()) throw TABLE_NOT_FOUND_ERR;
  const result = Cinema_movie_schema.destroy({ where: { id: movieObj.id } })
    .then(() => {
      return { message: `Movie by Id: ${movieObj.id} was removed` };
    })
    .catch((err) => {
      throw err;
    });
  return result;
};

export const clear_all_movies = async () => {
  if (!tableExists()) throw TABLE_NOT_FOUND_ERR;
  const result = Cinema_movie_schema.destroy({
    where: {},
  })
    .then(() => {
      return `TABLE CLEARED`;
    })
    .catch((err) => {
      throw err;
    });
  return result;
};

const TABLE_NOT_FOUND_ERR = new Error('Table does not exist', { code: 404 });
