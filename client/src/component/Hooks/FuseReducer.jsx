import React from "react";
import { useReducer, useState } from "react";

const ACTION = {
  INCREMENT: "Increment",
  DECREMENT: "Decrement",
  ADDNAME: "AddName",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.ADDNAME:
      return { ...state, ADDNAME: action.payload };
    default:
      return state;
  }
};

function FuseReducer() {
  // For UseReducer
  const [Name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, { count: 0, ADDNAME: "" });

  function handleSubmit(ev) {
    ev.preventDefault();
    dispatch({
      type: ACTION.ADDNAME,
      payload: Name,
    });
  }
  return (
    <div className="body2 text-center">
     <br />
      <div className="w-50 m-auto border  border-5"><br />
        <h2>UseReducer</h2>
        <div>
          <input
            type="text"
            className="w-50"
            value={Name}
            placeholder="Enter Your Name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button><br /><br />
          <h3>Name: {state.ADDNAME}</h3>
        </div>
        <div className="box w-50 m-auto border  border-5 p-2 mb-2">
          <button onClick={() => dispatch({ type: "Increment" })}>Add</button>
          <h2> {state.count}</h2>
          <button onClick={() => dispatch({ type: "Decrement" })}>Sub</button>
        </div><br />
      </div>
      
    </div>
  );
}

export default FuseReducer;
