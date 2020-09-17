import React from 'react';
import './App.css';

import MovieDisplayPanel from './components/MovieDisplayPanel';
import AddNewMovie from './components/AddNewMovie';

function App() {
    return (
        <div className="App">
            <h1 style={{ fontSize: '50px', textAlign: 'center' }}>MOVIE</h1>
            <AddNewMovie />
            <MovieDisplayPanel />
        </div>
    );
}

export default App;
