import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import updateProject from "../src/components/Project/updateProject";
import projectBoard from "../src/components/ProjectBoard/ProjectBoard";
import addProjectTask from "../src/components/ProjectBoard/ProjectTask/AddProjeckTask";
import Landing from "../src/components/Layout/Landing";
import Register from "../src/components/UserManagement/Register";
import Login from "../src/components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWToken from "./securityUtils/setJWToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";

const jwtToken = localStorage.jwtToken;
console.log(jwtToken);
if (jwtToken) {
  setJWToken(jwtToken);
  const decoded_jwt = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwt,
  });
  // console.log(decoded_jwt.exp);

  const currentTime = Date.now() / 1000;
  // console.log(currentTime);
  if (decoded_jwt.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Private Routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {
              //Public Routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={updateProject} />
            <Route exact path="/projectBoard/:id" component={projectBoard} />
            <Route
              exact
              path="/addProjectTask/:id"
              component={addProjectTask}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
