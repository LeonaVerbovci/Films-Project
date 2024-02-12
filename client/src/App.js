import React from 'react';
import './App.css';
import FilmsList from './components/FilmsList';
import { films as items } from './data';

function App() {
  console.log('items', items);
  return (
    <div className="App">
      <FilmsList films={items} />
    </div>
  );
}

export default App;
