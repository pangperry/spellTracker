import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loginUser } from "../../actions/authActions";

import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    maxWidth: 400,
    marginTop: 75,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    width: "35%",
    marginRight: 25,
    marginTop: 10,
    alignSelf: "flex-end"
  }
});

class ComposedTextField extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/sounds");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/sounds");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit = event => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // axios
    //   .post("/api/teachers/login", user)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
    this.props.loginUser(user, this.props.history);
  };

  render() {
    const { classes } = this.props;
    //I should refactor this so I don't use the.state everywhere below
    // const { errors } = this.state;

    return (
      <div className={classes.container}>
        <Typography align="center" variant="display1">
          Login
        </Typography>

        <FormControl className={classes.formControl} aria-describedby="email">
          <InputLabel htmlFor="email-helper">Email</InputLabel>
          <Input
            id="email-helper"
            value={this.state.email}
            onChange={this.handleChange("email")}
            error={!!(this.state.errors && this.state.errors.email)}
          />
          {this.state.errors && this.state.errors.email ? (
            <FormHelperText error={true} id="email-helper-text">
              {this.state.errors.email}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          className={classes.formControl}
          aria-describedby="password"
        >
          <InputLabel htmlFor="password-helper">Password</InputLabel>
          <Input
            id="password-helper"
            value={this.state.password}
            onChange={this.handleChange("password")}
            error={!!(this.state.errors && this.state.errors.password)}
            type="password"
          />
          {this.state.errors && this.state.errors.password ? (
            <FormHelperText error={true} id="password-helper-text">
              {this.state.errors.password}
            </FormHelperText>
          ) : null}
        </FormControl>
        <Button
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(
  withStyles(styles)(withRouter(ComposedTextField))
);
