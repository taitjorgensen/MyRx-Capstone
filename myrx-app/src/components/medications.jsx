import React, { Component } from "react";
import Counters from "./counters";
import { Link } from "react-router-dom";
import Form from "./common/form";
import axios from "axios";

const apiEndpoint = "https://myrx-app.firebaseio.com";
class Medications extends Component {
  state = {
    counters: [
      { id: 1, value: 0, name: "Medication A", dosage: "50 mg" },
      { id: 2, value: 0, name: "Medication B", dosage: "100 mg" },
      { id: 3, value: 0, name: "Medication C", dosage: "200 mg" },
      { id: 4, value: 0, name: "Medication D", dosage: "25 mg" }
    ],
    data: { name: "", dosage: "" },
    errors: {}
  };
  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    if (counters[index].value > 0) {
      counters[index].value--;
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
    counters[index].value = 0;
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  async componentDidMount() {
    const { data: medications } = await axios.get(apiEndpoint);
    this.setState({ medications });
  }

  handleAdd = async data => {
    const obj = data;
    const medication = await axios.post(apiEndpoint, obj);
    const medications = [medication, ...this.state.medications];
    this.setState({ medications });
    console.log("Submitted");
  };

  handleUpdate = async medication => {
    await axios.put(apiEndpoint + "/" + medication.id, medication);
    const medications = [...this.state.medications];
    const index = medications.indexOf(medication);
    medications[index] = { ...medication };
    this.setState({ medications });
  };

  render() {
    const totalCounters = this.state.counters.filter(c => c.value > 0).length;
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
          </span>
          <table className="container">
            <Counters
              counters={this.state.counters}
              onReset={this.handleReset}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          </table>
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
