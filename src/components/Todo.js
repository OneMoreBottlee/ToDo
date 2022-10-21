import { useEffect, useState } from "react";
import styled from "styled-components";
import Todoo from "./Todoo";

const TodoGrid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;
`;

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("위잉 위잉 에러에요");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TodoGrid>
      {todos.map((todo) => (
        <Todoo todo={todo} key={todo.id} />))}
    </TodoGrid>
  );
}

export default Todo;
