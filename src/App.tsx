import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    // BLL:
    //todoLists:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })
    // functions:
    const removeTask = (taskID: string, todoListID: string): void => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        const todoListsTasks = tasks[todoListID]
        const updatedTasks = [{id: v1(), title, isDone: false}, ...todoListsTasks]
        const copyTasks = {...tasks}
        copyTasks[todoListID] = updatedTasks
        setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoLIst: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoLIst])
        setTasks({...tasks, [newTodoListID]: []})
    }


    // UI:
    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender;
        switch (tl.filter) {
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
                break
            case "active":
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                break
            default:
                tasksForRender = tasks[tl.id]
        }
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListsComponents}
        </div>
    );
}

// @ts-ignore
export default App;
