import React, {FormEvent} from "react";

interface propsType {
    value: string;
    setValue: Function;
    handleSubmit: (e : FormEvent) => void;
}

const TodoForm = React.memo((props : propsType) => {
    //const TodoForm = ({value, setValue, setTodoData}) => {
    // console.log("Form component");

    const handleChange = (e : React.FormEvent<HTMLInputElement>) => {
        props.setValue(e.currentTarget.value);
    };

    /*function testclick (dd) {
        console.log(dd);
    }*/

    return (
        <div className="todoTop">
            <div className="title">
                <h1>My To Do List</h1>
                <form style={{display: "flex"}} onSubmit = {props.handleSubmit}>
                    <input
                        type="text"
                        name="value"
                        style={{flex: "10", padding: "5px"}}
                        placeholder="Title..."
                        value={props.value}
                        onChange={handleChange}
                        //onClick={testclick}
                    />
                    <input
                        type={"submit"}
                        value={"Add"}
                        className={"btn"}
                        style={{flex: "1"}}
                    />
                </form>
            </div>
        </div>
    );
});

export default TodoForm;