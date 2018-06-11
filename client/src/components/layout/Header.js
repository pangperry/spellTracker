import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  AppBar: {},
  Button: {
    fontSize: "1.25em"
  },
  Link: {
    textDecoration: "none",
    color: "#fff"
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography
            variant="display1"
            color="inherit"
            className={classes.flex}
          >
            <Link className={classes.Link} to="/">
              SpellTracker
            </Link>
          </Typography>
          <Button color="inherit" className={classes.Button}>
            <Link className={classes.Link} to="/login">
              {" "}
              Login
            </Link>
          </Button>
          <Button color="inherit" className={classes.Button}>
            <Link className={classes.Link} to="/register">
              Sign up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
