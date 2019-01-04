import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Patient from "./components/patient";
import Medications from "./components/medications";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MedicationForm from "./components/medicationForm";
import firebase from "firebase";
import "./App.css";

class App extends Component {
  componentWillMount() {
    var config = {};
    firebase.initializeApp(config);
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/patient" component={Patient} />
            <Route path="/medications" component={Medications} />
            <Route path="/newMedication" component={MedicationForm} />
            <Redirect from="/" exact to="/medications" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
