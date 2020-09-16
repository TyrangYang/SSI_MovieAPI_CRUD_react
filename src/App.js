import React from 'react';
import './App.css';

import ListAllMovie from './components/ListAllMovie';
import AddNewMovie from './components/AddNewMovie';

function App() {
    return (
        <div className="App">
            <AddNewMovie />
            <ListAllMovie />
        </div>
    );
}

export default App;
