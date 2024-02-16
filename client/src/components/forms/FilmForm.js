import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import FormMessage from './FormMessage';

const initData = {
  _id: null,
  title: '',
  img: '',
  director: '',
  description: '',
  duration: '',
  price: '',
  featured: false,
};

const FilmForm = ({ film, saveFilm, hideForm }) => {
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (film._id) {
      setData(film);
    } else {
      setData(initData);
    }
    setErrors({});
  }, [film]);

  const handleStringChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
    setErrors({
      ...errors,
      [target.name]: '',
    });
  };

  const handleNumberChange = ({ target }) => {
    const val = target.value.replace(/\D/g, '');
  };

  return (
    <form className="ui form">
      <div className="ui grid">
        {/* components here */}
        <div className="twelve wide column">
          {/*errors to be added -classname */}
          <div className={errors.title ? 'field error' : 'field'}>
            <label>Film title</label>
            <input
              value={data.title}
              onChange={handleStringChange}
              type="text"
              name="title"
              id="name"
              placeholder="film title"
            />
            <FormMessage>{errors.title}</FormMessage>
          </div>
          <div className={errors.description ? 'field error' : 'field'}>
            <label>Film description</label>
            <textarea
              value={data.description}
              onChange={handleStringChange}
              name="description"
              id="description"
              placeholder="film description"
            />
            <FormMessage>{errors.description}</FormMessage>
          </div>
          <div className="four wide column">
            <ReactImageFallback
              src={data.img}
              fallbackImage="http://via.placeholder.com/250x250"
              alt={data.title}
              className="ui image"
            />
          </div>
          <div className="twelve wide column">
            <div className={errors.img ? 'field error' : 'field'}>
              <label>Image</label>
              <input
                value={data.img}
                onChange={handleStringChange}
                type="text"
                name="img"
                id="img"
                placeholder="image"
              />
              <FormMessage>{errors.img}</FormMessage>
            </div>
          </div>
          <div className="six wide column">
            <div className={errors.director ? 'field error' : 'field'}>
              <label>Film director</label>
              <input
                value={data.director}
                onChange={handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              <FormMessage>{errors.director}</FormMessage>
            </div>
          </div>
          <div className="six wide column">
            <div className={errors.duration ? 'field error' : 'field'}>
              <label>Film duration</label>
              <input
                value={data.duration}
                onChange={handleNumberChange}
                type="text"
                name="duration"
                id="duration"
                placeholder="film duration"
              />
              <FormMessage>{errors.duration}</FormMessage>
            </div>
          </div>
        </div>
      </div>
      <div className="ui fluid buttons px-3">
        <button className="ui button primary">Save</button>
        <div className="or"></div>
        <span className="ui button" onClick={hideForm}>
          Hide form
        </span>
      </div>
    </form>
  );
};

FilmForm.propTypes = {
  film: PropTypes.object.isRequired,
  saveFilm: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
};

export default FilmForm;
