import React from 'react';
import './scss/App.scss';
import Pomodoro from './comp/Pomodoro';

function App() {
    return (
        <div className="app">
            <div className="app--title">Pomodoro</div>
           <Pomodoro/> 
        </div>
    )
}

export default App
