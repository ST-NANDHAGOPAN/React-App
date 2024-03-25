import React from "react";
import Welcome from "./Welcome";

function HOC(Component) {
  // HOC - To Pass Component as Prop
  const NewComponent = () => {
    return (
      <div className="body3 text-center ">
        <br />
        <div className="border border-5 m-auto w-50">
          <Welcome name="John" />
        </div>
        <br />
        <h3> "Passed From HOC"</h3>
        <Component />
      </div>
    );
  };
  return NewComponent;
}

export default HOC;
