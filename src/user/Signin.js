import React, { Component } from "react";
import image from "../image/authentication.svg";
import "../style/signup.css";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { signin, authenticate, isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false
  };

  onChange = e => {
    this.setState({
      ...this.state,
      error: false,
      [e.target.id]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ ...this.state, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        this.setState({ ...this.state, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({
            ...this.state,
            redirect: true
          });
        });
      }
    });
  };

  render() {
    const showError = () => (
      <div
        className="alert alert-danger"
        style={{ display: this.state.error ? "" : "none" }}
      >
        {this.state.error}
      </div>
    );

    const showLoading = () =>
      this.state.loading && (
        <div
          className="alert alert-info"
          style={{ display: this.state.success ? "" : "none" }}
        >
          <h2>...</h2>
        </div>
      );

    const { user } = isAuthenticated();
    const redirectPage = () => {
      if (this.state.redirect) {
        if (user && user.role === 1) {
          return <Redirect to="/admin/dashboard" />;
        } else {
          return <Redirect to="/user/dashboard" />;
        }
      }
      if (isAuthenticated()) {
        return <Redirect to="/" />;
      }
    };

    return (
      <React.Fragment>
        <div className="loginDiv">
          <div className="row">
            <div className="col-md-6 limit">
              <img src={image} alt="" />
            </div>
            <div className="col-md-6">
              <div className="auth__auth">
                <h1 className="auth__title">Access your account</h1>
                <p style={{ textAlign: "center" }}>
                  Fill in your email and password to proceed
                </p>

                <Form className="form" onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label>Email</Label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="loginInput"
                      placeholder="xyz@example.com"
                      onChange={this.onChange}
                    />

                    <Label>Password</Label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="loginInput"
                      onChange={this.onChange}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    />
                    <Button
                      type="submit"
                      onClick={this.toggle}
                      className="button button__accent"
                    >
                      Log in
                    </Button>
                  </FormGroup>
                </Form>
                {showLoading()}
                {showError()}
                {redirectPage()}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signin;
