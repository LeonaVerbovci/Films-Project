import React, { useEffect, useState } from 'react';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import PropTypes from 'prop-types';
import FilmsList from '../components/FilmsList';
import FilmForm from '../components/forms/FilmForm';
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminRoute from '../routes/AdminRoute';

export const AppContext = React.createContext();

const FilmsPage = (props) => {
  const [allFilms, setAllFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.films.fetchAll().then((films) => {
      setAllFilms(sortFilms(films));
      setLoading(false);
    });
  }, []);

  const sortFilms = (films) => {
    // three arguments
    // the array to be sorted
    // an array specifying the properties to sort by - featured, title
    // an array specifying the sorting order for each property

    // it means the films will be sorted first by the 'featured' property in descending order =desc
    // then within each group of items with the same 'featured' status they will be sorted by the 'title'
    // in ascending order - asc
    return _orderBy(films, ['featured', 'title'], ['desc', 'asc']);
  };

  const updateFilm = (filmData) =>
    api.films
      .update(filmData)
      .then((film) =>
        setAllFilms((prevItems) =>
          sortFilms(prevItems.map((item) => (item._id === film._id ? film : item)))
        )
      );

  const toggleFeatured = (id) => {
    //const film = allFilms.find((film) => film._id ===id);  Javascript
    const film = _find(allFilms, { _id: id });
    return updateFilm({ ...film, featured: !film.featured });
  };

  const addFilm = async (filmData) => {
    const film1 = await api.films.create(filmData);
    return setAllFilms((prevItems) => sortFilms([...prevItems, { ...film1 }]));
    //e shton filmin e ri ne array ekzistues
  };

  const saveFilm = (film) => {
    film._id === null ? addFilm(film) : updateFilm(film).then(() => navigate('/films'));
  };

  const deleteFilm = (film) => {
    api.films
      .delete(film)
      .then(() =>
        setAllFilms((prevFilms) => sortFilms(prevFilms.filter((f) => f._id !== film._id)))
      );
  };

  const cols = location.pathname === '/films' ? 'sixteen' : 'ten';

  return (
    <AppContext.Provider value={{ toggleFeatured, deleteFilm, user: props.user }}>
      <div className="ui stackable grid ">
        <AdminRoute
          path="/films/new"
          user={props.user}
          render={() => (
            <div className="six wide column">
              <FilmForm submit={saveFilm} film={{}}></FilmForm>
            </div>
          )}
        ></AdminRoute>
        <AdminRoute
          path="/films/edit/:_id"
          user={props.user}
          render={({ match }) => (
            <div className="six wide column">
              <FilmForm
                submit={saveFilm}
                film={
                  _find(allFilms, {
                    _id: match.params._id,
                  }) || {}
                }
              ></FilmForm>
              {loading ? (
                <div className="ui icon message">
                  <i className="notched circle loading icon" />
                  <div className="content">
                    <div className="header">films loading...</div>
                  </div>
                </div>
              ) : (
                <div className={`${cols} wide column`}>
                  <FilmsList films={allFilms}></FilmsList>
                </div>
              )}
            </div>
          )}
        ></AdminRoute>
      </div>
    </AppContext.Provider>
  );
};
FilmsPage.propTypes = {
  user: PropTypes.object.isRequired,
};

export default FilmsPage;
