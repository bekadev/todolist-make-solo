import React from "react";
import {FilterValueType} from "./App";
type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}
type TodoListType = {
    removeTask: (id: number) => void
    title: string
    tasks: Array<TasksType>
    changeFilter: (value: FilterValueType) => void
}

export const Todolist: React.FC<TodoListType> = (props) => {
    const onClickFilterHandler = () => {props.changeFilter}
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((e) => {
                    const onClickHandler = () => {
                       props.removeTask(e.id)
                    }
                    return (
                        <li key={e.id}>
                            <input type="checkbox" checked={e.isDone}/>
                            <span>{e.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickFilterHandler}>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}