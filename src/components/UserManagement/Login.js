import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      security: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.security !== state.security) {
      if (props.security.validToken) {
        console.log("inside validtoken");
        props.history.push("/dashboard");
      }
    }
  }

  // componentWillReceiveProps

  onChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = {
      username: JSON.stringify(this.state.username),
      password: JSON.stringify(this.state.password),
    };
    // const Login = JSON.stringify(LoginRequest);
    this.props.login(LoginRequest, this.props.history);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { login })(Login);
