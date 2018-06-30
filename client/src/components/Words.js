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
import Tooltip from "@material-ui/core/Tooltip";
import WordCard from "./WordCard";
import StudentSelector from "./StudentSelector";
import axios from "axios";
import { connect } from "react-redux";
import { getStudents } from "../actions/wordActions";

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
  },
  StudentSelector: {
    marginLeft: 50,
    justifyContent: "center",
    textAlign: "center"
  }
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1]
  };

  componentDidMount() {
    this.props.getStudents();
  }

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
    const {
      classes,
      currentSoundItem,
      currentStudent,
      currentWords
    } = this.props;

    let disableButton = currentSoundItem === null || currentStudent === null;
    let wordList =
      currentWords && currentWords.length ? (
        <List disablePadding>
          {currentWords.map(word => (
            <ListItem key={word._id} dense className={classes.listItem}>
              <WordCard word={word} />
            </ListItem>
          ))}
        </List>
      ) : null;

    return (
      <Paper className={classes.root}>
        <Typography
          color="primary"
          className={classes.Typography}
          variant="headline"
        >
          Current Words for
        </Typography>
        <StudentSelector />

        <div className={classes.button}>
          <Tooltip
            title="first select student and soundItem"
            id="tooltip-disabled"
            placement="bottom"
            disableHoverListener={!disableButton}
          >
            <div>
              <Button
                disabled={disableButton}
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Add Word
              </Button>
            </div>
          </Tooltip>
        </div>
        {wordList}
      </Paper>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  currentSoundItem: state.soundItems.currentSoundItem,
  currentStudent: state.words.currentStudent,
  currentWords: state.words.currentWords,
  students: state.words.students
});
export default connect(mapStateToProps, { getStudents })(
  withStyles(styles)(CheckboxListSecondary)
);
