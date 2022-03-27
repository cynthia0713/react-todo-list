import React from 'react';

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {

  const inputTextHandler = (e) => {
    // console.log(e.target.value)
    setInputText(e.target.value)
  }

  const submitTodoHandler = (e) => {
    e.preventDefault(); //prevents page from freshing on click
    if(inputText !== ""){
      setTodos([
        ...todos,
        {
          id: Math.random() * 1000,
          text: inputText,
          completed: false
        }
      ]) // '...todos' if already have any todos in list then pass it
    }else{
      alert("Please enter a task!")
    }
    setInputText("")
  }

  const statusHandler = (e) => {
    setStatus(e.target.value); 
  }

  return (
    <form action="">
      <input value={inputText} onChange={inputTextHandler} type="text" className='todo-input' />
      <button onClick={submitTodoHandler} className='todo-button' type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">
            All
          </option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </form>
  );
}

export default Form;