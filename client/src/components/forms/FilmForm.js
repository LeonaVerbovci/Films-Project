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
    setErrors({}); // errori nuk duhet te shfaqet pasi te ndryshohet selected film
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
    setData({
      ...data,
      [target.name]: Number(val),
    });
    setErrors({
      ...errors,
      [target.name]: '',
    });
  };

  const handleCheckBoxChange = (event) => {
    const { name, checked } = event.target;
    //  eventiosht objekt e ka mrena targetin,targeti objekt mrena name,checked
    setData({
      ...data,
      [name]: checked,
    });
  };

  const validate = (data) => {
    const errors = {};
    if (!data.title) errors.title = 'title can not be blank';
    if (!data.description) errors.description = 'description can not be blank';
    if (!data.director) errors.director = 'director can not be blank';
    if (!data.img) errors.img = 'image can not be blank';
    if (!data.duration) errors.duration = 'duration can not be blank';
    if (!data.price) errors.description = 'price can not be blank';

    if (parseInt(data.duration) < 1) {
      errors.duration = 'Duration cannot be ngeative value';
    }
    if (parseFloat(data.price) <= 0) {
      errors.price = 'Price cannot be ngeative value';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      //objct.keys i mer keys te objektit eors,k\then nje array nese nuk ka errors i thirr funksionet savedata dhe set data
      saveFilm(data);
      setData(initData);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="ui form">
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
                type="number"
                name="duration"
                id="duration"
                placeholder="film duration"
              />
              <FormMessage>{errors.duration}</FormMessage>
            </div>
          </div>
          <div className="six wide column">
            <div className={errors.price ? 'field.error' : 'field'}>
              <label>Price</label>
              <input
                value={data.price}
                onChange={handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="film pice"
              />

              <FormMessage>{errors.price}</FormMessage>
            </div>
          </div>
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              onChange={handleCheckBoxChange}
              value={data.featured}
              type="checkbox"
              name="featured"
              id="featured"
              checked={data.featured}
            ></input>
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
