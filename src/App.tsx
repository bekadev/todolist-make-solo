import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}
function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'City', filter: 'all'},
        {id: todolistID_2, title: 'County', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Almaty", isDone: true},
            {id: v1(), title: "Astana", isDone: true},
            {id: v1(), title: "Oral", isDone: false}
        ]
    })

    function removeTask(id: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task)=>!task.id)})
    }

    function addTask(title: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false}, ...tasks[todolistID]]})

    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, value} : tl))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }




    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
