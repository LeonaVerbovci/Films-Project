import React, { useState } from 'react';
import _orderBy from 'lodash/orderBy';
import './App.css';
import FilmsList from './components/FilmsList';
import { films as items } from './data';
import FilmContext from './context/FilmContext';

function App() {
  const [allFilms, setAllFilms] = useState(items);
  console.log('allFilms', allFilms);
  // useEffect(() => {
  //   setAllFilms(items)
  // }, []);

  const sortFilms = (films) => {
    // three arguments
    // the array to be sorted
    // an array specifying the properties to sort by - featured, title
    // an array specifying the sorting order for each property

    // it means the fulms will be sorted first by the 'featured' property in descending order =desc
    // then within each group of items with the same 'featured' status they will be sorted by the 'title'
    // in ascending order - asc
    _orderBy(films, ['featured', 'title'], ['desc', 'asc']);
  };

  const toggleFeatured = (id) => {
    setAllFilms((prevFilms) =>
      setAllFilms(
        sortFilms(
          // For each film it checks if the _id of the film matched the id passed to this function,
          // If it matches it created a new object using spread operator
          // to clone the original film object, but with the "featured" property toggled using !
          // if the id doesnt match it returns the original object
          prevFilms.map((film) => (film._id === id ? { ...film, featured: !film.featured } : film))
        )
      )
    );
  };

  const testContext = 'testContext';

  return (
    <FilmContext.Provider value={{ toggleFeatured, testContext }}>
      <div className="App">
        <FilmsList films={allFilms} />
      </div>
    </FilmContext.Provider>
  );
}

export default App;