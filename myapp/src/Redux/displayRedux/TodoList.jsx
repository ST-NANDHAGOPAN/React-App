import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10');
      return response.data;
    } catch (error) {
      throw error;
    }
  });

function TodoList() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  return (

   <div className='body2 d-flex  align-items-center '>
     <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>
      {loading === 'loading' && <div className='mt-5 spinner'></div>}
      {loading === 'failed' && <div className="error-text">Error: {error}</div>}
      {loading === 'succeeded' && (
        <table className="todo-table  text-center">
          <thead>
            <tr >
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr className="todo-item " key={todo.id}>
                <td className='text-center'>{todo.id}</td>
                <td className='text-center'>{todo.title}</td>
                <td className='text-center'>{todo.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
   </div>
  );
}

export default TodoList;
