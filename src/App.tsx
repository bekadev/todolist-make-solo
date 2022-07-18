import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'complited'


export const App = () => {
    const [tasks, setTasks] = useState( [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(e => e.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(e => e.isDone === false)
    }

    if (filter === 'complited') {
        tasksForTodoList = tasks.filter(e => e.isDone === true)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to Learn You Bro'}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

