import React, { Component } from "react";
import Counters from "./counters";
import { Link } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";

class Medications extends Component {
  state = {
    counters: [
      {
        id: 1,
        quantity: 0,
        name: "Yellow Tablet",
        dosage: "50 mg",
        image: "./images/yellow.jpg",
        time: ""
      },
      {
        id: 2,
        quantity: 0,
        name: "Heart Medication",
        dosage: "100 mg",
        image: "./images/heart.jpg",
        time: ""
      },
      {
        id: 3,
        quantity: 0,
        name: "Neuro Inhibitor",
        dosage: "200 mg",
        image: "./images/neuro.jpg",
        time: ""
      },
      {
        id: 4,
        quantity: 0,
        name: "Vitamin b12",
        dosage: "250 mg",
        image: "./images/b12.jpg",
        time: ""
      },
      {
        id: 5,
        quantity: 0,
        name: "Lipitor",
        dosage: "20 mg",
        image: "./images/lipitor.jpg",
        time: ""
      }
    ],
    timeForMeds: [
      { _id: 1, value: "7:00 AM" },
      { _id: 2, value: "10:00 AM" },
      { _id: 3, value: "1:00 PM" },
      { _id: 4, value: "4:00 PM" },
      { _id: 5, value: "7:00 PM" }
    ],
    route: "medications",
    data: { name: "", dosage: "", quantity: "", image: "", time: "" },
    errors: {}
  };
  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].quantity++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].quantity > 0) {
      counters[index].quantity--;
    }
    this.setState({ counters });
  };

  handleResetAll = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleReset = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].quantity = 0;
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  async componentDidMount() {
    const { data: medications } = await axios.get(
      firebase.database().ref(this.state.route)
    );
    this.setState({ medications });
  }

  handleAdd = async data => {
    const obj = data;
    const medication = await axios.post(
      firebase.database().ref(this.state.route),
      obj
    );
    const medications = [medication, ...this.state.medications];
    this.setState({ medications });
    console.log("Submitted");
  };

  handleUpdate = async medication => {
    await axios.put(
      firebase.database().ref(this.state.route) + "/" + medication.id,
      medication
    );
    const medications = [...this.state.medications];
    const index = medications.indexOf(medication);
    medications[index] = { ...medication };
    this.setState({ medications });
  };
  handleChange = event => {
    const errors = { ...this.state.errors };
    const input = event.target.value;
    console.log("Input  " + input);
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];

    let data = { ...this.state.data };
    data = input.value;
    this.setState({ data });
  };

  render() {
    const totalCounters = this.state.counters.filter(c => c.quantity > 0)
      .length;
    const timeOption = this.state.counters._id;
    return (
      <React.Fragment>
        <div>
          <span>
            <span
              className="fas fa-prescription-bottle-alt"
              style={{ fontSize: "50px" }}
            />
            <span style={{ fontSize: "50px" }}> Medications to Take: </span>
            <span
              className="badge badge-pill badge-primary"
              style={{ fontSize: "30px" }}
            >
              {totalCounters}
            </span>
            <span style={{ fontSize: "40px" }}>{timeOption}</span>
          </span>
          <div className="container">
            <Counters
              counters={this.state.counters}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          </div>
          <span>
            <Link
              to="/newMedication"
              className="btn btn-info"
              style={{ marginBottom: 15, marginLeft: 30 }}
            >
              Add Medication
            </Link>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Medications;
