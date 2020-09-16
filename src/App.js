import React from 'react';
import './App.css';

import ListAllMovie from './components/ListAllMovie';
import AddNewMovie from './components/AddNewMovie';

function App() {
    return (
        <div className="App">
            <h1 style={{ fontSize: '50px', textAlign: 'center' }}>MOVIE</h1>
            <AddNewMovie />
            <ListAllMovie />
        </div>
    );
}

export default App;
