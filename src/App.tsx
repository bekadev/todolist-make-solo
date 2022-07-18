import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export const App = () => {
    const tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist
                title={'What to Learn You Bro'}
                tasks={tasks}
            />
        </div>
    );
}

