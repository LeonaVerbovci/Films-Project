/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import FilmsList from '../components/FilmsList';
import FilmForm from '../components/forms/FilmForm';
import api from '../api';

export const AppContext = React.createContext();

function FilmsPage({ user }) {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.films.fetchAll().then((films) => {
      setItems(sortFilms(films));
      setLoading(false);
    });
  }, []);

  const sortFilms = (films) => _orderBy(films, ['featured', 'title'], ['desc', 'asc']);

  const toggleFeatured = (id) => {
    const film = _find(items, { _id: id });
    return updateFilm({ ...film, featured: !film.featured });
  };

  const saveFilm = (film) =>
    (film._id === null ? addFilm(film) : updateFilm(film)).then(() => navigate('/films'));

  const addFilm = (filmData) => {
    const newFilmData = { ...filmData };
    delete newFilmData._id;
    return api.films
      .create(newFilmData)
      .then((film) => setItems((prevItems) => sortFilms([...prevItems, { ...film }])));
  };

  console.log('itemsss', items);
  const updateFilm = (filmData) =>
    api.films.update(filmData).then((film) => {
      console.log('film', film);
      return setItems((prevItems) =>
        sortFilms(prevItems.map((item) => (item._id === film._id ? film : item)))
      );
    });

  const deleteFilm = (film) =>
    api.films
      .delete(film)
      .then(() =>
        setItems((prevItems) => sortFilms(prevItems.filter((item) => item._id !== film._id)))
      );

  const navigate = useNavigate();

  return (
    <AppContext.Provider
      value={{
        toggleFeatured,
        deleteFilm,
        user,
        saveFilm,
      }}
    >
      <Routes>
        <Route path="/" element={<FilmsListPage items={items} loading={loading} />} />
        <Route path="new" element={<FilmFormPage saveFilm={saveFilm} />} />
        <Route path="edit/:id" element={<EditFilmFormPage items={items} saveFilm={saveFilm} />} />
      </Routes>
    </AppContext.Provider>
  );
}

function FilmsListPage({ items, loading }) {
  const location = useLocation();

  return (
    <div className="ui stackable grid">
      {loading ? (
        <div className="ui icon message">
          <i className="notched circle loading icon" />
          <div className="content">
            <div className="header">Films loading</div>
          </div>
        </div>
      ) : (
        <div className="sixteen wide column">
          <FilmsList films={items} />
        </div>
      )}
    </div>
  );
}

function EditFilmFormPage({ items, saveFilm }) {
  const { id } = useParams();
  const film = items.find((item) => item._id === id);

  return <FilmForm submit={saveFilm} film={film} />;
}

function FilmFormPage({ saveFilm }) {
  return <FilmForm submit={saveFilm} />;
}

export default FilmsPage;
