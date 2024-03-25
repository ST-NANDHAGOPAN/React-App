import React from "react";
import { useState } from 'react'
import $ from "jquery";
function AuseState() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [ValueEmail, setValueEmail] = useState("");
  const [ValueName, setValueName] = useState("");

  const handleFunction = (ev) => {
    ev.preventDefault();
    alert("details are to be Added");
    setValueEmail(Email);
    setValueName(Name);
    $("#Name").val("");
    $("#Email").val("");
  };
  return (
    <div className="text-center body2"><br />
        <h1 className="">Using UseState</h1><br />
        <form  onSubmit={handleFunction} className=" w-50 m-auto  border border-5 ">
          <fieldset >
            <legend className=" fw-bolder">Form</legend>
            <div>
              <label htmlFor="Email">Name: </label>
              <input
               className="w-50"
                type="text"
                id="Name"
                placeholder="Enter Your Name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div><br />
            <div>
              <label htmlFor="Email">Email: </label>
              <input
              className="w-50"
                type="email"
                id="Email"
                name="Email"
                placeholder="Enter Your Email"
                onChange={(ev) => setEmail(ev.target.value)}
              /> 
            </div><br />
          </fieldset><br />
          <button type="submit">Submit</button><br /><br />
        </form><br />
        <div className="border border-5 m-auto w-50 ">
          <p className="fw-bolder fs-3 ">Name:{ValueName}</p>
          <p className="fw-bolder fs-3 ">Email:{ValueEmail}</p>
        </div>
      
    </div>
  );
}

export default AuseState;
