import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../Reducers/counterSlice";
import store from "../store";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="body2 text-center ">
      <br />
      <div className="w-50 m-auto border  border-5"><br />
        <h2>Redux Store</h2> <br />
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="count-value btn btn-danger p-2 ">{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <br />
        <br />
        <button aria-label="Reset value" onClick={() => store.resetCounter()}>
          Reset
        </button><br /><br />
      </div>
    </div>
  );
}

export default Counter;
