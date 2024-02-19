import React from "react";
import { useState, useEffect } from "react";

function BuseEffect() {
  const [count, setCount] = useState(0);
  const [add, setAdd] = useState(0);

  useEffect(() => {
    document.title = ` ${add} times`;
  }, [add]);

  return (
    <div className="body2 pt-5">
      <div className=" text-center w-50 m-auto border  border-5 ">
        <h2 className=" fw-bolder p-3">Using UseEffect</h2>
        <div className="box w-50 m-auto border  border-5 ">
          <h3>{count}</h3>
          <p>No Dependency</p>
          <button onClick={() => setCount(count + 1)}>ADD</button><br /><br />
        </div><br />
        <div className="box  w-50 m-auto border  border-5">
          <h3>{add}</h3>
          <p>Selective Dependency and see title will Also Render</p>
          <button onClick={() => setAdd(add + 1)}>ADD</button><br /><br />
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

export default BuseEffect;
