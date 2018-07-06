import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";
import SoundItems from "./SoundItems";
import Words from "./Words";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  gridContainer: {
    justifyContent: "center"
  }
});

function GridIntegration(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={7} md={8}>
          <SoundItems />
        </Grid>
        <Grid item xs={6} sm={5} md={4}>
          <Words />
        </Grid>
      </Grid>
    </div>
  );
}

GridIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string
};

export default compose(withStyles(styles), withWidth())(GridIntegration);
