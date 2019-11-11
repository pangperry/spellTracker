import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentSoundItem } from "../actions/soundItemActions";
import { getWordCounts, getNeedsWorkCounts } from "../actions/wordActions";

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import SubcategoryNav from "./SubcategoryNav";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto",
    height: "100vh",
    overflowY: "auto",
    paddingBottom: 150
  },
  table: {},
  Subcatdiv: {
    height: 90
  },
  CountWarning: {
    color: "red"
  }
  // ratioWarning: {
  //   color: "#FDD835"
  // },
  // ratioClear: {
  //   color: "#00C853"
  // }
});

class SimpleTable extends React.Component {
  state = {
    selectedId: -1
  };

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ subcategory: "Select A Subcategory", selectedId: -1 });
    } else if (this.props.currentWords !== prevProps.currentWords) {
      this.props.getWordCounts(this.props.currentWords);
      this.props.getNeedsWorkCounts(this.props.currentWords);
    } else if (this.props.subcategory !== prevProps.subcategory) {
      this.setState({ selectedId: -1 });
    }
  }

  handleClick = (e, id) => {
    e.preventDefault();
    // TESTING OUT new UI -- TODO: refactor this click event
    if (this.state.selectedId === id) {
      document.getElementById("tempAdd").click();
    }
    this.setState({ selectedId: id });
    let currentSoundItem = this.props.soundItems.filter(
      item => item._id === id
    )[0];
    this.props.setCurrentSoundItem(currentSoundItem);
  };

  isSelected = id => this.state.selectedId === id;

  render() {
    const {
      classes,
      soundItems,
      category,
      subcategory,
      wordCounts,
      needsWorkCounts
    } = this.props;
    if (soundItems === undefined) return null;

    let data;
    if (category === "all") {
      data = soundItems;
    } else if (subcategory) {
      data = soundItems.filter(
        item => item.subcategory === subcategory && item.category === category
      );
    } else {
      data = soundItems.filter(item => item.category === category);
    }

    const tableRows = data.map(n => {
      const isSelected = this.isSelected(n._id);
      const count = wordCounts[n._id];
      const needsWorkCount = needsWorkCounts[n._id];

      // let ratioColor;
      // if (ratio === 0) {
      //   ratioColor = classes.ratioClear;
      // } else if (ratio < 0.5) {
      //   ratioColor = classes.ratioWarning;
      // } else {
      //   ratioColor = classes.ratioDanger;
      // }

      return (
        <TableRow key={n._id ? n._id.toString() : null} selected={isSelected}>
          <Hidden smDown>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n._id)}
            >
              {n.sound}
            </TableCell>
          </Hidden>
          <Hidden xsDown>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n._id)}
            >
              {n.spelling}
            </TableCell>
          </Hidden>
          <TableCell
            padding="dense"
            onClick={event => this.handleClick(event, n._id)}
          >
            {n.keyword}
          </TableCell>
          <TableCell
            padding="dense"
            onClick={event => this.handleClick(event, n._id)}
          >
            {n.level}
          </TableCell>
          <Hidden smDown>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n._id)}
            >
              {n.syllableType}
            </TableCell>
          </Hidden>
          <TableCell
            className={needsWorkCount ? classes.CountWarning : null}
            padding="dense"
          >
            {count}
          </TableCell>
        </TableRow>
      );
    });

    const tableHeaders = (
      <TableRow>
        <Hidden smDown>
          <TableCell padding="dense">sound</TableCell>
        </Hidden>
        <Hidden xsDown>
          <TableCell padding="dense">spelling</TableCell>
        </Hidden>
        <TableCell padding="dense">keyword</TableCell>
        <TableCell padding="dense">level</TableCell>
        <Hidden smDown>
          <TableCell padding="dense">syllableType</TableCell>
        </Hidden>
        <TableCell padding="dense">current words</TableCell>
      </TableRow>
    );

    return (
      <Paper className={classes.root}>
        <div className={classes.Subcatdiv}>
          <SubcategoryNav />
        </div>
        <Table className={classes.table}>
          <TableHead>{tableHeaders}</TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // soundItems: state.auth.soundItems,
  soundItems: state.soundItems.soundItems,
  subcategory: state.soundItems.currentSubcategory,
  category: state.soundItems.currentCategory,
  currentWords: state.words.currentWords,
  wordCounts: state.words.wordCounts,
  needsWorkCounts: state.words.needsWorkCounts
});

export default connect(mapStateToProps, {
  setCurrentSoundItem,
  getWordCounts,
  getNeedsWorkCounts
})(withStyles(styles)(SimpleTable));
