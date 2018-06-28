import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import WordCard from "./WordCard";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    backgroundColor: theme.palette.background.paper,
    maxHeight: "80vh",
    overflowY: "auto"
  },
  Typography: {
    textAlign: "center",
    textTransform: "upperCase",
    paddingTop: 60
  },
  listItem: {
    justifyContent: "center"
  },
  button: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  }
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1]
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography
          color="primary"
          className={classes.Typography}
          variant="headline"
        >
          Current Words
        </Typography>
        <div className={classes.button}>
          <Button variant="outlined" color="primary" className={classes.button}>
            Add Word
          </Button>
        </div>
        <List disablePadding>
          {[0, 1, 2, 3].map(value => (
            <ListItem key={value} dense className={classes.listItem}>
              <WordCard />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxListSecondary);
