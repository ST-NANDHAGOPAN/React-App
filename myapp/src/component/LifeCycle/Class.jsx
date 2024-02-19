import React, { Component } from "react";
import HOC from "../HOC/HOC";

class ClassComponent extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    console.log("Constructor called");
  }

  componentDidMount() {
    console.log("Component did mount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update");
    if (prevState.count !== this.state.count) {
      console.log("Count updated:", this.state.count);
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    console.log("Render method called");
    return (

      <div className="text-center body2 ">
        <div className="border border-5 w-50 m-auto">
        <br />
        <h1>Lifecycle Of Class Component</h1>
        <br />

        <h3>Count: {this.state.count}</h3>
        <div>
          <button onClick={this.incrementCount}>Increment</button>
        </div>
        </div>
        
      </div>
    );
  }
}

export default HOC(ClassComponent);
