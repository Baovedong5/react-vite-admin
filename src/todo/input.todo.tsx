import { useState } from "react";

interface IProps {
  name: string;
  age: number;
  info: {
    gender: string;
    address: string;
  };
  abc?: string;
  test: (value: string) => void;
  listTodo: string[];
  setListTodo: (value: string[]) => void;
}

const InputTodo = (props: IProps) => {
  const { test, listTodo, setListTodo } = props;

  const [todo, setTodo] = useState("");

  const handleClick = () => {
    if (!todo) {
      alert("Empty todo");
      return;
    }
    setListTodo([...listTodo, todo]);
    setTodo("");
    // test(todo);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <div>Add new todo</div>
      <input
        type="text"
        onChange={(event) => {
          setTodo(event.target.value);
        }}
        value={todo}
      />
      &nbsp; &nbsp;
      <button onClick={() => handleClick()}>Save</button>
    </div>
  );
};

export default InputTodo;
