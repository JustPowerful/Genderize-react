import React from "react";
import "./form.css";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      personName: "",
      gender: "",
      loading: false
    };
    this.inputHander = this.inputHander.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
  }

  // Input Event handler
  inputHander(event) {
    this.setState({
      personName: event.target.value
    });
  }

  sendQuery(event) {
    this.setState({ loading: true });
    event.preventDefault();
    fetch(`https://api.genderize.io?name=${this.state.personName}`)
      .then((res) => res.json())
      .then((data) => this.setState({ gender: data.gender, loading: false }));
  }

  render() {
    return (
      <div className="formDivider">
        <form>
          <input type="text" onChange={this.inputHander} />
          <button onClick={this.sendQuery}>Submit</button>
        </form>

        <h3>Name: {this.state.personName}</h3>
        <h3>
          Gender:{" "}
          {this.state.loading
            ? "Loading ..."
            : this.state.gender
            ? this.state.gender
            : "Can't find a gender for that!"}
        </h3>
      </div>
    );
  }
}

export default Form;
