import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import {
  withStyles,
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  Typography,
  Button
} from "@material-ui/core";

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
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/sounds");
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography align="center" variant="display1">
          Sign Up
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            error={!!(this.state.errors && this.state.errors.name)}
          />
          {this.state.errors && this.state.errors.name ? (
            <FormHelperText error={true} id="name-helper-text">
              {this.state.errors.name}
            </FormHelperText>
          ) : null}
        </FormControl>

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
            type="password"
            id="password-helper"
            value={this.state.password}
            onChange={this.handleChange("password")}
            error={!!(this.state.errors && this.state.errors.password)}
          />
          {this.state.errors && this.state.errors.password ? (
            <FormHelperText error={true} id="password-helper-text">
              {this.state.errors.password}
            </FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          className={classes.formControl}
          aria-describedby="password2"
        >
          <InputLabel htmlFor="password2-helper">Confirm Password</InputLabel>
          <Input
            type="password"
            id="password2-helper"
            value={this.state.password2}
            onChange={this.handleChange("password2")}
            error={!!(this.state.errors && this.state.errors.password2)}
          />
          {this.state.errors && this.state.errors.password2 ? (
            <FormHelperText error={true} id="email-helper-password2">
              {this.state.errors.password2}
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
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(
  withStyles(styles)(withRouter(ComposedTextField))
);
