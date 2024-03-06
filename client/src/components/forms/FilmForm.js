/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import FormMessage from './FormMessage';
import { AppContext } from '../../pages/FilmsPage';

const initialData = {
  _id: null,
  title: '',
  description: '',
  director: '',
  duration: '',
  price: '',
  img: '',
  featured: false,
};

const FilmForm = (props) => {
  const { film, submit } = props;
  const context = useContext(AppContext);

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  console.log('test', context);
  useEffect(() => {
    if (film && film._id) {
      setData(film);
    }
  }, [film]);

  const validate = (data) => {
    const errors = {};
    if (!data.title) errors.title = 'Title cannot be blank';
    if (!data.description) errors.description = 'Description cannot be blank';
    if (!data.img) errors.img = 'Image cannot be blank';
    if (!data.director) errors.director = 'Director cannot be blank';
    if (!data.duration) errors.duration = 'Duration cannot be blank';
    if (!data.price) errors.price = 'Price cannot be blank';

    if (parseFloat(data.duration) <= 0) errors.duration = 'Duration must be a positive value';
    if (parseFloat(data.price) <= 0) errors.price = 'Price must be a positive value';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      submit(data)
        .catch((err) => setErrors(err.response.data.errors))
        .finally(() => setLoading(false));
    }
  };

  const handleStringChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleNumberChange = (e) => {
    setData({ ...data, [e.target.name]: parseFloat(e.target.value) });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleCheckboxChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const cls = loading ? 'ui form loading' : 'ui form';

  return (
    <form className={cls} onSubmit={handleSubmit}>
      <div className="ui  grid">
        <div className="twelve wide column">
          {/* title */}
          <div className={errors.title ? 'field error' : 'field'}>
            <label>Film title</label>
            <input
              type="text"
              name="title"
              id="name"
              placeholder="film title"
              value={data.title}
              onChange={handleStringChange}
            />
            <FormMessage>{errors.title}</FormMessage>
          </div>

          {/* Description */}
          <div className={errors.description ? 'error field' : 'field'}>
            <label>Film description</label>
            <textarea
              name="description"
              id="description"
              placeholder="film description"
              value={data.description}
              onChange={handleStringChange}
            />
            <FormMessage>{errors.description}</FormMessage>
          </div>
        </div>

        {/*  image box  */}
        <div className="four wide column">
          <ReactImageFallback
            src={data.img}
            fallbackImage="http://via.placeholder.com/250x250"
            alt={data.title}
            className="ui image"
          />
        </div>

        <div className="twelve wide column">
          <div className={errors.img ? 'error field' : 'field'}>
            <label>Image</label>
            <input
              type="text"
              name="img"
              id="img"
              placeholder="img"
              value={data.img}
              onChange={handleStringChange}
            />
            <FormMessage>{errors.img}</FormMessage>
          </div>
        </div>
        {/* END  image box  */}

        {/*  Director  */}
        <div className="six wide column field">
          <div className={errors.director ? 'error field' : 'field'}>
            <label>Director</label>
            <input
              type="text"
              name="director"
              id="director"
              placeholder="film director"
              value={data.director}
              onChange={handleStringChange}
            />
            <FormMessage>{errors.director}</FormMessage>
          </div>
        </div>
        {/*  END Director  */}

        {/* Duration */}
        <div className="six wide column">
          <div className={errors.duration ? 'error field' : 'field'}>
            <label>Duration</label>
            <input
              type="number"
              name="duration"
              min="1"
              step="1"
              id="duration"
              placeholder="Duration"
              value={data.duration}
              onChange={handleNumberChange}
            />
            <FormMessage>{errors.duration}</FormMessage>
          </div>
        </div>
        {/* END Duration */}

        {/*  Price */}
        <div className="six wide column">
          <div className={errors.price ? 'error field' : 'field'}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              min="1"
              step="0.1"
              id="price"
              placeholder="price"
              value={data.price}
              onChange={handleNumberChange}
            />
            <FormMessage>{errors.price}</FormMessage>
          </div>
        </div>
        {/*  END Price */}

        {/* Featured */}
        <div className="six wide column inline field">
          <label htmlFor="featured">Featured</label>
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={data.featured}
            onChange={handleCheckboxChange}
          />
        </div>
        {/* END Featured */}
      </div>
      {/* END ui grid */}

      {/* Buttons  */}
      <div className="ui fluid buttons">
        <button className="ui button primary" type="submit">
          Save
        </button>
        <div className="or" />
        <Link to="/films" className="ui button">
          Hide form
        </Link>
      </div>
    </form>
  );
};

export default FilmForm;
