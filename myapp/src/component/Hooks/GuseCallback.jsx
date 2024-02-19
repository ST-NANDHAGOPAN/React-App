import React, { useState, useMemo, useCallback } from "react";

function GuseCallback() {
  const [todos, setTodos] = useState([]);

  // Memoizing a calculated value using useMemo
  const totalTodos = useMemo(() => {
    console.log("Calculating totalTodos...");
    return todos.length;
  }, [todos]);

  // Memoizing a callback function using useCallback
  const addTodo = useCallback(() => {
    console.log("Adding a new todo...");
    setTodos((prevTodos) => [...prevTodos, `Todo ${prevTodos.length + 1}`]);
  }, []);

  return (
    <div className="body2 text-center"><br />
      <div className="w-50 m-auto border border-5"><br />
        <h2>UseCallback</h2>
        <br />
        <p>Total Todos: ({totalTodos}) this will UseMemo</p>
        <button onClick={addTodo}>Add Todo</button> &nbsp;
        <span>UseCallback only run when Its call</span>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuseCallback;
