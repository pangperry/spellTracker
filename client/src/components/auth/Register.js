import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
    password2: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography align="center" variant="display1">
          Register
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
          <FormHelperText id="name-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} aria-describedby="email">
          <InputLabel htmlFor="email-helper">Email</InputLabel>
          <Input
            id="email-helper"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <FormHelperText id="email-helper-text">
            Some important helper text
          </FormHelperText>
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
          />
          <FormHelperText id="password-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl>

        <FormControl
          className={classes.formControl}
          aria-describedby="password2"
        >
          <InputLabel htmlFor="password2-helper">Confirm Password</InputLabel>
          <Input
            id="password2-helper"
            value={this.state.password2}
            onChange={this.handleChange("password2")}
          />
          <FormHelperText id="password2-helper-text">
            Some important helper text
          </FormHelperText>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComposedTextField);
