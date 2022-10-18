import { useEffect, useState } from "react";
import styled from "styled-components";

const TodoGrid = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;
`;

const TodoBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 70px;
  max-height: 100px;
  border-radius: 10px;
  background-color: white;
  overflow: auto;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
  :hover{
    box-shadow: 1px 2px 5px 1px #72a2f6;
  }
`;

const TodoText = styled.div`
  text-align: center;
  background-color: white;
  :hover{
    color: #72a2f6;
  }
`;

const DelBtn = styled.button`
  position: relative;
  width: 35px;
  height: 23px;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  background-color: #ffe0e6;
  color: #f32d67;
  right: -158px;
  bottom: -2px;
  :hover{
    background-color: #ffb3c1;
  }
  :active {
    background-color: #efefef;
    bottom: -4px;
  }
`;

function Todo() {
  const [todos, setTodos] = useState([]);
  const [changeTodos, setChangeTodos] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [saveId, setSaveId] = useState("");

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

  const handleDelBtn = (id) => {
    fetch("http://localhost:3001/todos/" + id, {
      method: "DELETE",
    }).then(window.location.reload());
  };

  const handleDoubleClick = (id) => {
    setIsEditable(true);
    setSaveId(id)
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        fetch("http://localhost:3001/todos/" + saveId,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                todo: changeTodos
            })
        }).then(window.location.reload());
        setIsEditable(false);
    }
  };

  return (
    <TodoGrid>
      {todos.map((todo) => (
        <TodoBox key={todo.id}>
          {isEditable ? (
              <input
                key={todo.id}
                onChange={(e)=> setChangeTodos(e.target.value)}
                onKeyDown={handleKeyDown}
              />
          ) : (
            <TodoText onDoubleClick={() => handleDoubleClick(todo.id)}>{todo.todo}</TodoText>
          )}
          <DelBtn onClick={() => handleDelBtn(todo.id)}>DEL</DelBtn>
        </TodoBox>
      ))}
    </TodoGrid>
  );
}

export default Todo;
