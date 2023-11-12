import './App.css';
import React, {useState, useCallback, useEffect} from "react";
import Todolist from "./components/Todolist";
import TodoForm from "./components/TodoForm";
import axios from "./api/axios";
import {AxiosResponse} from "axios";

interface Todo {
    id?: string;
    title: string;
    completed: boolean;
}

export default function App() {
    //console.log("App component");

    useEffect(() => {
        fetchTodoData();
    }, []);

    const fetchTodoData = async () => {
        const result  = await axios.get("");
        const data : Todo[] = result.data;
        console.log(data);
        setTodoData(data);
    }

    const initData : Todo[] = [];
    const [todoData, setTodoData] = useState(initData);
    const [value, setValue] = useState("");

    const handleClick = useCallback(async (id: string) => {
        const result = await axios.delete("", {
            data :[id]
        });
        console.log("del = ", result);

        let newTodoData = todoData.filter((data) => data.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
    }, [todoData]);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        if(value === '') {
            alert("내용을 입력하세요");
            return;
        }

        let newTodo: Todo = {
            title : value,
            completed : true,
        };

        const result = await axios.post("", [newTodo]);
        newTodo.id = result.data[0];
        console.log("add = ", newTodo);

        setTodoData(prev => [...prev, newTodo]);
        localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    };

    return (
        <div className={"container"}>

            <TodoForm value={value}
                      setValue={setValue}
                      handleSubmit={handleSubmit}
            />

            <Todolist todoData={todoData}
                      setTodoData={setTodoData}
                      handleClick={handleClick}
            />
        </div>
    );
}
