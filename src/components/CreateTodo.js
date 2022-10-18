import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";


const Input = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
`

const InputTodo = styled.input`
    margin-top: 15px;
    width: 75%;
    min-height: 60px;
    border-radius: 20px;
    border: none;
    font-size: 20px;
    text-align: center;
    background-color: white;
    box-shadow: 1px 2px 5px 1px #f67280;
    :focus{
        outline: 2px solid #f67280 ;
        box-shadow: 1px 2px 5px 2px #f67280;
    }
`

function CreateTodo () {
    const [todo, setTodo] = useState("")
    const {setValue} = useForm()
    const handleValid = () => {
        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: Date.now(),
                todo
            }),
        })
        .then(()=>{
            setValue("todo", "")
        })
    }

    return (
            <Input onSubmit={handleValid}>
                <InputTodo onChange={(e)=> setTodo(e.target.value)} placeholder="할일쓰슈 💬" />
            </Input>
    )
}

export default CreateTodo;