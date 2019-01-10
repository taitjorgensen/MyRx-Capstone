import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

var firebase = require("firebase");
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "", role: "", phoneNumber: "" },
    roles: [
      { value: "patient", name: "Patient" },
      { value: "healthcareWorker", name: "Healthcare Provider" },
      { value: "careTaker", name: "Care Taker" }
    ],
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    role: Joi.string()
      .required()
      .label("Role"),
    phoneNumber: Joi.number()
      .integer()
      .required()
      .label("Phone Number")
  };

  doSubmit = () => {
    var user = firebase.auth();
    return user;
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.doSubmit}>
          {this.renderInput("username", "Username")}
          <p>Must be a valid email address.</p>
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderSelect("role", "Role", this.state.roles)}
          {this.renderInput("phoneNumber", "Phone Number")}
          <p>*Numbers only, no dashes.</p>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
