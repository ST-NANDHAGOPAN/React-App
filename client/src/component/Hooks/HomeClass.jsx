import React, { Component } from 'react';
// Using useState in ClassComponent
class HomeClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      valueName:"",
      valueEmail:"",
    };
  }

  handleFunction = (ev) => {
    ev.preventDefault();
    alert("Details are to be added");
   this.setState({
    valueName:this.state.Name,
    valueEmail:this.state.Email
  })
  }

  handleNameChange = (ev) => {
    this.setState({ Name: ev.target.value });
  }

  handleEmailChange = (ev) => {
    this.setState({ Email: ev.target.value });
  }

  render() {
    return (
      <div>
        <h1>Using useState in Class Component</h1>
        <form action="" method="get" onSubmit={this.handleFunction}>
          <fieldset>
          <legend>form</legend>
          <div>
            <label htmlFor="Name">Name</label>
            <input type="text" 
            id="Name" 
            placeholder="Enter Your Name" 
            onChange={this.handleNameChange} />
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <input type="email" 
            id="Email" 
            name="Email"
            placeholder="Enter Your Email"
            onChange={this.handleEmailChange} />
          </div>
          <button type="submit">Submit</button>
          </fieldset>
        </form>
        <div>
          <p>Name:{ this.state.valueName}</p>
          <p>Email:{this.state.valueEmail }</p>
        </div>
      </div>
    );
  }
}

export default HomeClass;
