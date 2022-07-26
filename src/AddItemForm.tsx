import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.ctrlKey === true){
            onClickAddTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const errorMessageStyles = {color: "hotpink"}
    return (
        <div>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={errorMessageStyles}>Title is required!</div>}
            </div>
        </div>
    );
};

