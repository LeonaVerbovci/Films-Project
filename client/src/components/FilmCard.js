import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Featured from './Featured';
import { AppContext } from '../pages/FilmsPage';
import { Link } from 'react-router-dom';

const FilmCard = ({ film }) => {
  const [confirm, setConfirm] = useState(false);
  const { deleteFilm, user } = useContext(AppContext);

  const showConfirm = () => setConfirm(true);
  const hideConfirm = () => setConfirm(false);

  const adminActions = (
    <div className="extra content">
      <div className="ui two buttons">
        {confirm ? (
          <>
            <span className="ui red button" onClick={() => deleteFilm(film)}>
              <i className="ui icon check"></i>
              YES
            </span>
            <span className="ui grey basic button" onClick={hideConfirm}>
              <i className="ui icon icon close" />
              NO
            </span>
          </>
        ) : (
          <div className="ui two buttons">
            <Link to={`/films/edit/${film._id}`} className="ui green basic button">
              <i className="ui icon edit" />
            </Link>
            <span className="ui red basic button" onClick={showConfirm}>
              <i className="ui icon trash"></i>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const userAction = (
    <div className="extra content">
      <button className="ui green basic button">Add to cart</button>
    </div>
  );

  return (
    <div className="ui card">
      <span className="ui right corner label">
        <i className="empty star icon"></i>
      </span>
      <div className="image">
        <span className="ui green label ribbon">$ {film.price}</span>
        <Featured featured={film.featured} id={film._id} />
        <img src={film.img} alt="film" />
      </div>
      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i>
          {film.director}
          <span className="right floated">
            <i className="icon wait right"></i>
            {film.duration} min
          </span>
        </div>
      </div>
      {user.token && user.role === 'admin' && adminActions}
      {user.token && user.role === 'user' && userAction}
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default FilmCard;
