import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
       setTitle(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)
    return (
        editMode
        ? <input
            value={title}
            onChange={onChangeSetTitle}
            autoFocus={true}
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};
