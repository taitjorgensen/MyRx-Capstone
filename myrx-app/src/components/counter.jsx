import React, { Component } from "react";
import axios from "axios";

const apiEndpoint = "https://myrx-app.firebaseio.com";
class Counter extends Component {
  render() {
    return (
      <tr>
        <td>
          <span className={this.getMedicationName()}>
            <h2>
              <span className="fas fa-capsules" />
              {this.formatName()}
            </h2>
          </span>
        </td>
        <td>
          <span className="btn btn-md m-2">
            <h2>{this.getDosage()}</h2>
          </span>
        </td>
        <td>
          <span className={this.getBadgeClasses()}>
            <h2>{this.formatCount()}</h2>
          </span>
        </td>
        <td>
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-success btn-md m-2"
          >
            <span className="fas fa-plus" />
          </button>
        </td>
        <td>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-warning btn-md m-2"
          >
            <span className="fas fa-minus" />
          </button>
        </td>
        <td>
          <button
            onClick={() => this.props.onReset(this.props.counter)}
            className="btn btn-primary btn-md m-2"
          >
            Reset
          </button>
        </td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-md m-2"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }

  async componentDidMount() {
    const { data: medications } = await axios.get(apiEndpoint);
    this.setState({ medications });
  }

  getMedicationName() {
    let name = "badge m-3 badge-alert";
    name += this.props.counter.name;
    return name;
  }

  formatName() {
    const { name } = this.props.counter;
    return name;
  }

  getDosage() {
    const { dosage } = this.props.counter;
    return dosage;
  }

  getBadgeClasses() {
    let classes = "btn btn-";
    classes +=
      this.props.counter.value === 0 ? "info btn-md m-2" : "primary btn-md m-2";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "0" : value;
  }
}

export default Counter;
