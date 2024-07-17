import React, { useState } from "react";
import axios from 'axios';
import './style.css';

const App = () => {
  const [username, setUsername] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const onTextChange = (e) => {
    setTask(e.target.value);
  }

  const saveTaskToSheet = (username, task) => {
    const data = { username, task };
    axios.post('https://sheet.best/api/sheets/86449326-52aa-4924-ab9f-fca293ecc221', data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error saving to Google Sheet:', error);
      });
  };

  const onAddClick = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (todos.some(existingTask => existingTask.toLowerCase() === task.trim().toLowerCase())) {
      alert("Task already queued");
    } else if (task.trim()) {
      setTodos([...todos, task.trim()]);
      saveTaskToSheet(username, task.trim());
      setTask(""); 
    }
  };

  const onDelete = (taskToRemove) => {
    setTodos(todos.filter((task) => task !== taskToRemove));
  }

  const onDeleteAll = () => {
    if (window.confirm("Sara Kaam Kr Liya Na Delete Krdu ?")) {
      setTodos([]);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Welcome to Happy's ToDo App</h1>
      <div className="card1">
      <form onSubmit={onAddClick}>
        <label >Arre Arre Naam Toh Batao*</label>
        <input onChange={onUsernameChange} value={username} type="text" placeholder="Bata bhi do" required/>
        <input onChange={onTextChange} value={task} type="text" placeholder={`Hi, ${username}! Aaj kya karne ka socha?`} />
        <div className="buttons">
        <button type="submit" className="btn">Karenge</button>
        <button onClick={onDeleteAll} className="btn">Sara Kaam Khatam</button>
        </div>
      </form>
      </div>
      <div className="card2">
        {todos.length === 0 ? (
          <p>Kl karay so aaj kar, aaj kar aaj karay so abb !</p>
        ) : (
          <ul>
            {todos.map((value, index) => {
              return (
                <li key={index}>{index + 1}. Hum Aaj {value} Karenge
                  <button onClick={() => onDelete(value)} className="btn">Kar Chuke</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
