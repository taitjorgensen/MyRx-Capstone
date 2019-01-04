import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMedication, saveMedication } from "./medicationService";
import Medications from "./medications";

class MedicationForm extends Form {
  state = {
    data: { name: "", dosage: "", _id: "" },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Medication Name"),
    dosage: Joi.string()
      .required()
      .label("Dosage")
  };

  componentDidMount() {
    const medicationId = this.props.match.params.id;
    if (medicationId === "new") return;

    const medication = getMedication(medicationId);
    //   if (!medication) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(medication) });
  }

  // mapToViewModel(medication) {
  //   return {
  //     // _id: medication._id,
  //     name: medication.name,
  //     dosage: medication.dosage
  //   };
  // }
  handleSubmit = () => {
    Medications.handleAdd(this.state.data);
  };

  doSubmit = () => {
    saveMedication(this.state.data);
    this.props.history.push("/medications");
  };

  render() {
    return (
      <div>
        <h1>New Medication Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("dosage", "Dosage")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MedicationForm;
