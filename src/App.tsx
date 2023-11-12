import InputTodo from "./todo/input.todo";
import { useState } from "react";

function App() {
  const name = "Phuong";
  const age = 21;
  const info = {
    gender: "male",
    address: "Ha Noi",
  };

  const [listTodo, setListTodo] = useState([
    "todo1",
    "todo2",
    "todo3",
    "todo4",
    "todo5",
    "todo6",
  ]);

  const handleTest = (name: string) => {
    alert(`Handle Test with name = ${name}`);
  };

  return (
    <div>
      <div className="parent">
        <div className="children"></div>
      </div>
      <InputTodo
        name={name}
        age={age}
        info={info}
        test={handleTest}
        listTodo={listTodo}
        setListTodo={setListTodo}
      />
      <ul>
        {listTodo.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
