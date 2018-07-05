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
import { getStudents, setFilteredWords } from "../actions/wordActions";
import AddWordButton from "./AddWordButton";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    marginTop: theme.spacing.unit * 1,
    backgroundColor: theme.palette.background.paper,
    maxHeight: "100vh",
    overflowY: "auto",
    paddingBottom: 150
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
    if (this.props.currentWords) {
      this.props.setFilteredWords(
        this.props.currentWords ? this.props.currentWords.slice() : []
      );
    }
  }

  componentDidUpdate(prevProps) {
    // TODO: add tests and refactor this mess:
    //none of the below matters if there isn't a current student

    //change in current words
    if (this.props.currentWords !== prevProps.currentWords) {
      if (this.props.currentWords) {
        this.props.setFilteredWords(
          this.props.currentWords ? this.props.currentWords.slice() : []
        );
      }
      //change in current sound
    } else if (
      this.props.currentSoundItem &&
      this.props.currentSoundItem !== prevProps.currentSoundItem
    ) {
      if (this.props.currentWords && this.props.currentSoundItem) {
        let filteredWords = this.props.currentWords
          .slice()
          .filter(word => word.soundItem === this.props.currentSoundItem._id);
        this.props.setFilteredWords(filteredWords);
      }

      //change in current category
    } else if (
      this.props.currentCategory &&
      this.props.currentCategory !== prevProps.currentCategory
    ) {
      let filteredWords = this.props.currentWords
        .slice()
        .filter(word => word.category === this.props.currentCategory);
      this.props.setFilteredWords(filteredWords);
    } else if (
      this.props.currentSubcategory &&
      this.props.currentSubcategory !== prevProps.currentSubcategory
    ) {
      if (this.props.currentWords) {
        let filteredWords = this.props.currentWords
          .slice()
          .filter(word => word.subcategory === this.props.currentSubCategory);
        this.props.setFilteredWords(filteredWords);
      }
    }
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
      currentWords,
      filteredWords
    } = this.props;

    let disableButton = currentSoundItem === null || currentStudent === null;
    let wordList =
      filteredWords && filteredWords.length ? (
        <List disablePadding>
          {filteredWords.map(word => (
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
              <AddWordButton disableButton={disableButton} />
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
  soundItems: state.soundItems.soundItems,
  currentSoundItem: state.soundItems.currentSoundItem,
  currentCategory: state.soundItems.currentCategory,
  currentSubCategory: state.soundItems.currentSubCategory,
  currentStudent: state.words.currentStudent,
  currentWords: state.words.currentWords,
  filteredWords: state.words.filteredWords,
  students: state.words.students
});
export default connect(mapStateToProps, { getStudents, setFilteredWords })(
  withStyles(styles)(CheckboxListSecondary)
);
