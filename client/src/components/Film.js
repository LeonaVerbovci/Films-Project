import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../api';

const Film = ({ match }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.films.fetchById(match.params._id).then((film) => {
      setFilm(film);
      setLoading(false);
    });
  }, [match.params._id]);
  return (
    <>
      {loading ? (
        <h1>........loading........</h1>
      ) : (
        <>
          <h1 className="ui center aligned diving header">{film.title}</h1>
          <div className="ui grid ">
            <div className="four wide column">
              <img className="ui fluid image" src={film.img} alt={film.name} />
            </div>
            <div className="six wide column">
              <p>{film.description}</p>
              <p> Director: {film.director}</p>
              <p>Duration:{film.duration}</p>
              <p> Price: {film.price}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Film.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Film;
