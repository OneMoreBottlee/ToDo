import styled from "styled-components";
import CreateTodo from "./components/CreateTodo";
import Todo from "./components/Todo";

const Ground = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderDiv = styled.section`
  margin-top: 20px;
  width: 850px;
  height: 100px;
`;

const ContentDiv = styled.section`
  margin-top: 20px;
  width: 850px;
  min-height: 800px;
`;

function App() {
  return (
    <Ground>
      <HeaderDiv>
        <CreateTodo />
      </HeaderDiv>
      <ContentDiv>
        <Todo />
      </ContentDiv>
    </Ground>
  );
}

export default App;
