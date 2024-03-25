import React from "react";
import { useState, useRef } from "react";

function DuseRef() {
  const sd = useRef("Nandha");
  const [BName, setBName] = useState("");

  return (
    <div className="body2 pt-3 ">
      <div className="text-center w-50 m-auto border  border-5"><br />
        <h2>UseRef</h2>
        <p>Update value without render</p>
        <label htmlFor="Email">Name:</label>
        <input
        className=" w-50"
          type="text"
          placeholder="Enter Your Name"
          onChange={(ev) => setBName(ev.target.value)}
        />
        <h3> Hi {sd.current}</h3>
        <h3> Hi {(sd.current = BName)}</h3>
      </div>
    </div>
  );
}

export default DuseRef;
