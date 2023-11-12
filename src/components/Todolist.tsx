import React, {FormEvent} from "react";
import axios from "../api/axios";

interface Todo {
    id?: string;
    title?: string;
    completed?: boolean;
}

interface propsType {
    todoData: Todo[];
    setTodoData: Function;
    handleClick: (e: string | undefined) => void;
}

const Todolist = React.memo((props : propsType) => {
    //const Todolist = ({todoData, setTodoData}) => {
    // console.log("List component");

    const changeCompleted = async (id: string | undefined) => {
        let item : Todo = {};
        let newTodoData = props.todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed
                item.completed = data.completed;
                item.id = data.id;
            }
            return data;
        });

        const result = await axios.put("", [item]);
        console.log("upd = ", result);

        props.setTodoData( newTodoData );
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    return (
        <ul>
            {props.todoData.map((data) => (
                <li  key={data.id}
                     className={data.completed ? "" : "checked"}
                     onClick={() => changeCompleted(data.id)} >
                     {data.title}
                     <span onClick={(e) => {
                        e.stopPropagation();
                        props.handleClick(data.id);
                    }}>x</span>
                </li>
            ))}
        </ul>
    )
});

export default Todolist;