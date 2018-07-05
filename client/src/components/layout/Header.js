import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  setCurrentStudent,
  setCurrentWords,
  setFilteredWords,
  resetWordCounts
} from "../../actions/wordActions";
//also need to deal with wordCounts
import NavBar from "./Navbar";

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

class ButtonAppBar extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.setCurrentStudent(null);
    this.props.setCurrentWords([]);
    this.props.setFilteredWords([]);
    this.props.resetWordCounts({});
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated, teacher } = this.props.auth;

    const guestLinks = (
      <Fragment>
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
      </Fragment>
    );

    const authLinks = (
      <Button
        onClick={this.onLogoutClick}
        color="inherit"
        className={classes.Button}
      >
        Logout
      </Button>
    );

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
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
          {isAuthenticated ? <NavBar /> : null}
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default withStyles(styles)(ButtonAppBar);

export default connect(mapStateToProps, {
  logoutUser,
  setCurrentStudent,
  setCurrentWords,
  setFilteredWords,
  resetWordCounts
})(withStyles(styles)(withRouter(ButtonAppBar)));
