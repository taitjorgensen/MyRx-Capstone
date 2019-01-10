import React, { Component } from "react";
import Medications from "./medications";

class Patient extends Component {
  state = {
    medications: [
      {
        id: 1,
        patient: "Judy Ward",
        counters: [4, 3, 3, 4],
        time: ["7:00 AM", "10:00 AM", "2:00 PM", "7:00 PM"],
        current: true
      },
      {
        id: 2,
        patient: "Dorothy Johnson",
        counters: [2, 3, 1],
        time: ["8:00 AM", "11:30 PM", "7:00 PM"],
        current: true
      },
      {
        id: 3,
        patient: "Maxine Brewer",
        counters: [5, 2, 2, 4],
        time: ["6:30 AM", "11:00 AM", "2:30 PM", "7:00 PM"],
        current: false
      },
      {
        id: 4,
        patient: "Dee Dee White",
        counters: [2, 2],
        time: ["8:00 AM", "6:00 PM"],
        current: true
      }
    ],
    medicationSelected: false,
    route: "patients",
    data: { name: "", medications: "", counters: "" },
    errors: {}
  };

  render() {
    let displayCounter1 = this.state.medications[0].patient;
    let displayCounter2 = this.state.medications[1].patient;
    let displayCounter3 = this.state.medications[2].patient;
    let displayCounter4 = this.state.medications[3].patient;
    let displayTime1 = this.state.medications[0].time[2];
    let displayTime2 = this.state.medications[1].time[1];
    let displayTime3 = this.state.medications[2].time[1];
    let displayTime4 = this.state.medications[3].time[1];

    const totalMedications = this.state.medications.filter(
      m => m.counters.length > 0
    ).length;
    const {
      onReset,
      medications,
      onDelete,
      onIncrement,
      onDecrement
    } = this.props;

    return (
      <table class="col-col-6">
        <tr>
          <th>
            <span
              className="fas fa-prescription-bottle-alt"
              style={{ fontSize: "50px" }}
            >
              Patients:{" "}
            </span>
            <span
              className="badge badge-pill badge-primary"
              style={{ fontSize: "30px" }}
            >
              {totalMedications}
            </span>

            <span style={{ paddingLeft: "20px" }}> </span>

            <span
              className="badge badge-pill badge-warning"
              style={{ fontSize: "30px" }}
            >
              1
            </span>
            <span style={{ paddingLeft: "20px" }}> </span>
            <span
              className="badge badge-pill badge-danger"
              style={{ fontSize: "30px" }}
            >
              1
            </span>
          </th>
        </tr>

        <tr
          style={{
            fontSize: "40px",
            backgroundColor: "rgb(37, 188, 45, .5)"
          }}
        >
          <td>{displayCounter1}</td>
          <td
            style={{
              paddingLeft: "40px"
            }}
          >
            {displayTime1}
          </td>

          <button className="btn btn-success">Current</button>
        </tr>
        <tr
          style={{
            fontSize: "40px",
            backgroundColor: "rgb(239, 234, 83, .5)"
          }}
        >
          <td>{displayCounter2}</td>
          <td style={{ paddingLeft: "40px" }}>{displayTime2}</td>

          <button className="btn btn-warning">Delayed</button>
        </tr>
        <tr
          style={{
            fontSize: "40px",
            backgroundColor: "rgb(206, 59, 59, .5)"
          }}
        >
          <td>{displayCounter3}</td>
          <td style={{ paddingLeft: "40px" }}>{displayTime3}</td>

          <button className="btn btn-danger">Late!</button>
        </tr>
        <tr
          style={{
            fontSize: "40px",
            backgroundColor: "rgb(37, 188, 45, .5)"
          }}
        >
          <td>{displayCounter4}</td>
          <td
            style={{
              paddingLeft: "40px"
            }}
          >
            {displayTime4}
          </td>

          <button className="btn btn-success">Current</button>
        </tr>
      </table>
    );
  }
}
export default Patient;
