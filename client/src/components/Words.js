import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Paper, Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import WordCard from "./WordCard";
import StudentSelector from "./StudentSelector";
import { connect } from "react-redux";
import { getStudents, setFilteredWords } from "../actions/wordActions";
import AddWordButton from "./AddWordButton";
import WordsMenu from "./WordsMenu";

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
    if (this.props.currentWords) {
      this.props.setFilteredWords(
        this.props.currentWords ? this.props.currentWords.slice() : []
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentWords !== prevProps.currentWords ||
      this.props.currentSoundItem !== prevProps.currentSoundItem ||
      this.props.currentSubcategory !== prevProps.currentSubcategory ||
      this.props.currentCategory !== prevProps.currentCategory
    ) {
      let filteredWords = this.props.currentStudent
        ? this.filterWords(
            this.props.currentWords,
            this.props.currentSoundItem,
            this.props.currentSubcategory,
            this.props.currentCategory
          ).sort((a, b) => new Date(b.date) - new Date(a.date))
        : [];

      this.props.setFilteredWords(filteredWords);
    }
  }

  //TODO: consider moving this to actions?
  filterWords = (
    currentWords,
    currentSoundItem,
    currentSubcategory,
    currentCategory
  ) => {
    // if (currentCategory === "all") {
    //   return [...currentWords];
    //   console.log("all");
    // }
    if (!currentWords.length) {
      console.log("no current words");
      return [];
    }
    if (currentSoundItem) {
      console.log("soundItem");
      return currentWords
        .slice()
        .filter(word => word.soundItem === currentSoundItem._id);
    }
    if (currentSubcategory) {
      console.log("subcategory change");
      console.log(currentWords);
      return currentWords
        .slice()
        .filter(word => word.subcategory === currentSubcategory);
    }
    if (currentCategory) {
      console.log("current category");
      if (currentCategory === "all") {
        return [...currentWords];
        console.log("all");
      }
      return currentWords
        .slice()
        .filter(word => word.category === currentCategory);
    }
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
    const {
      classes,
      currentSoundItem,
      currentStudent,
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
  currentSubcategory: state.soundItems.currentSubcategory,
  currentStudent: state.words.currentStudent,
  currentWords: state.words.currentWords,
  filteredWords: state.words.filteredWords,
  students: state.words.students
});

export default connect(mapStateToProps, { getStudents, setFilteredWords })(
  withStyles(styles)(CheckboxListSecondary)
);
