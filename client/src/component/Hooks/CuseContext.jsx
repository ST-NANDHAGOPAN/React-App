import React from "react";
import { useState, createContext } from "react";

function useContext() {
  const UserContext = createContext();
  const [user] = useState("Nandha");
  const [company] = useState("Sumanas tech");

  return (
    <div className="body2 pt-4">
      <div className="text-center w-50 m-auto border  border-5"><br />
        <UserContext.Provider value={user}>
          <h2>UseContext</h2>
          <br />
          <p className=" fs-6  ">Passing Values through useContext</p>
          <h3> Hi ({user})</h3>
          <h3>Welcome to ({company})</h3>
          <br />
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default useContext;
