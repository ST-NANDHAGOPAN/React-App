
import { fetchTodos } from '../displayRedux/TodoList';

const initialState = {
  todos: [],
  loading: 'idle',
  error: null,
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchTodos.pending.type:
      return {
        ...state,
        loading: 'loading',
      };
    case fetchTodos.fulfilled.type:
      return {
        ...state,
        loading: 'succeeded',
        todos: action.payload,
      };
    case fetchTodos.rejected.type:
      return {
        ...state,
        loading: 'failed',
        error: action.error.message,
      }; 
    default:
      return state;
  }
};

export default todoReducer;
