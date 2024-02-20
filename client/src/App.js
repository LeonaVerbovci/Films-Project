import React, { useEffect, useState } from 'react';
import _orderBy from 'lodash/orderBy';
import { generate as id } from 'shortid';
import './App.css';
import FilmsList from './components/FilmsList';
import { films as items } from './data';
import FilmContext from './context/FilmContext';
import TopNavigation from './components/TopNavigation';
import FilmForm from './components/forms/FilmForm';
function App() {
  const [allFilms, setAllFilms] = useState(items);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState({});
  console.log('allFilms', allFilms);
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
  useEffect(() => {
    setAllFilms(sortFilms(items));
  }, []);
  const toggleFeatured = (id) => {
    setAllFilms((prevFilms) =>
      sortFilms(
        // For each film it checks if the _id of the film matched the id passed to this function,
        // If it matches it created a new object using spread operator
        // to clone the original film object, but with the "featured" property toggled using !
        // if the id doesnt match it returns the original object
        prevFilms.map((film) => (film._id === id ? { ...film, featured: !film.featured } : film))
      )
    );
  };
  const cols = showAddForm ? 'ten' : 'sixteen';
  const hideForm = () => {
    setShowAddForm(false);
    setSelectedFilm({});
  };

  const showForm = () => {
    setShowAddForm(true);
    setSelectedFilm({});
  };

  const selectFilmForEdit = (selectedFilm) => {
    setSelectedFilm(selectedFilm);
  };
  const addFilm = (film) => {
    console.log('add film', film);
    setAllFilms((prevFilms) => sortFilms([...prevFilms, { ...film, _id: id() }]));
    setShowAddForm(false);
  };

  const updateFilm = (film) => {
    console.log('film', film);
  };

  const saveFilm = (film) => {
    film._id === null ? addFilm(film) : updateFilm(film);
  };

  const deleteFilm = (film) => {
    setAllFilms((prevFilms) => sortFilms(prevFilms.filter((f) => f._id !== film._id)));
    setSelectedFilm({});
    setShowAddForm(false);
  };

  return (
    <FilmContext.Provider value={{ toggleFeatured, selectFilmForEdit, deleteFilm }}>
      <div className="ui container pt3">
        <TopNavigation showForm={showForm} />
        <div className="ui stackable grid">
          {showAddForm && (
            <div className="six wide column">
              <FilmForm hideForm={hideForm} saveFilm={saveFilm} film={selectedFilm} />
            </div>
          )}
          <div className={`${cols} wide column`}>
            <FilmsList films={allFilms} />
          </div>
        </div>
      </div>
    </FilmContext.Provider>
  );
}
export default App;
