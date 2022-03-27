import React, { useState, useEffect } from 'react'
import './App.css';
import Form from './components/form';
import TodoList from "./components/todolist"

function App() {

  //USE STATE
  const [inputText, setInputText] = useState(""); 
  //to-do list in an array
  const [todos, setTodos] = useState([]);
  //state to filter todos: all (default), complete, incomplete
  const [status, setStatus] = useState("all"); 
  const [filteredTodos, setFilteredTodos] = useState([])

  //Run once when the app starts
  useEffect(()=> {
    getLocalTodos(); 
  }, [])

  //USE EFFECT 
  useEffect(()=> {
    filterHandler(); 
    saveLocalTodos(); 
  }, [todos, status]) //function runs everytime we add change todo or change status

  const filterHandler = () => {
    //filter todo and if completed == true then mark as complete, if false mark as incomplete
    //default shows all list
    switch(status){ //status = completed or incompleted
      case 'completed': 
        setFilteredTodos(todos.filter(todo => todo.completed === true)) 
        break;
      case 'incomplete': 
        setFilteredTodos(todos.filter(todo => todo.completed === false)) 
        break;
      default: 
        setFilteredTodos(todos)
        break;
    } 
  }

  //save todo to local storage
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos)) // saving and pushing what we have in the state
  }

  const getLocalTodos = () => {
    //check if there's anything in local storage
    if(localStorage.getItem('todos') === null){
      //if nothing in local storage, set an empty array
      localStorage.setItem('todos', JSON.stringify([])) 
    }else{
      //if we do, get the item and push it up to the state
      let todoLocal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)))
      setTodos(todoLocal)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Cynthia's Todo List</h1>
      </header>
      <Form
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos}
        setInputText={setInputText} 
        setStatus={setStatus}
      />
      <TodoList 
        todos={todos} 
        setTodos={setTodos} 
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
