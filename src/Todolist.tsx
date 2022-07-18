import React from "react";
type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}
type TodoListType = {
    title: string
    tasks: Array<TasksType>
}

export const Todolist: React.FC<TodoListType> = (props) => {
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}