import React, { Component } from "react";
import Medications from "./medications";

class TimeForMeds extends Component {
  state = {
    timeForMeds: [
      { id: 1, time: "7:00 AM" },
      { id: 2, time: "10:00 AM" },
      { id: 3, time: "1:00 PM" },
      { id: 4, time: "4:00 PM" },
      { id: 5, time: "7:00 PM" }
    ]
  };
  render() {
    return (
      <div>
        <h1>Time to Take Medications</h1>
        {/* <ul>
          <TimeForMeds timeForMeds={this.state.timeForMeds} />
          {timeForMeds.map(medications => (
            <Medications
              key={medications.id}
              value={medications.time}
              medications={medications}
            />
          ))}
        </ul> */}
      </div>
    );
  }
}

export default TimeForMeds;
