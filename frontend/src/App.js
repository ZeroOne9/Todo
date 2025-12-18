import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// const API_URL = process.env.REACT_APP_API_URL|| "http://localhost:10000";
const API_URL = process.env.REACT_APP_API_URL|| "https://todo-kupl.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await axios.post(`${API_URL}/api/todos`, { text: input });
      setInput("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      
      <h1>📝Todo List Của Thiên Deployed via GitHub Actions</h1>    
      <h1>VoAnhThien_DH52201482_CT5_Ca3</h1>  
       <h1>Hi</h1>  
      <form onSubmit={addTodo}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
      <footer style={{ marginTop: "20px", color: "#999", fontSize: "14px" }}>
        Deployed via GitHub Actions 🚀 | Version 1.0
      </footer> 
    </div>
  );
}

export default App;
