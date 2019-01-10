import React from "react";
import Form from "./common/form";

class TimeForMeds extends Form {
  state = {
    timeForMeds: [
      { _id: 1, value: "7:00 AM" },
      { _id: 2, value: "10:00 AM" },
      { _id: 3, value: "1:00 PM" },
      { _id: 4, value: "4:00 PM" },
      { _id: 5, value: "7:00 PM" }
    ]
  };
  render() {
    return (
      <div>
        <h1>Time to Take Medications</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect(
            "time",
            "Time to take medication",
            this.state.timeForMeds
          )}
        </form>
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
