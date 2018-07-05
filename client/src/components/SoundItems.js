import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentSoundItem } from "../actions/soundItemActions";
import { getWordCounts } from "../actions/wordActions";

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@material-ui/core";
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
  }
});

class SimpleTable extends React.Component {
  state = {
    selectedId: -1
  };

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ subcategory: "Select A Subcategory" });
    } else if (this.props.currentWords !== prevProps.currentWords) {
      this.props.getWordCounts(this.props.currentWords);
    }
  }

  handleClick = (e, id) => {
    e.preventDefault();
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
      wordCounts
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
      const count = this.props.wordCounts[n._id];
      return (
        <TableRow
          key={n._id ? n._id.toString() : null}
          hover
          selected={isSelected}
        >
          <TableCell
            padding="dense"
            onClick={event => this.handleClick(event, n._id)}
          >
            {n.sound}
          </TableCell>
          <TableCell
            padding="dense"
            onClick={event => this.handleClick(event, n._id)}
          >
            {n.spelling}
          </TableCell>
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
          <TableCell
            padding="dense"
            onClick={event => this.handleClick(event, n._id)}
          >
            {n.syllableType}
          </TableCell>
          <TableCell padding="dense">
            {count & (count > 0) ? (
              <Typography color="primary">{count}</Typography>
            ) : (
              <Typography color="default">{count}</Typography>
            )}
          </TableCell>
        </TableRow>
      );
    });

    const tableHeaders = (
      <TableRow>
        <TableCell padding="dense">sound</TableCell>
        <TableCell padding="dense">spelling</TableCell>
        <TableCell padding="dense">keyword</TableCell>
        <TableCell padding="dense">level</TableCell>
        <TableCell padding="dense">syllableType</TableCell>
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
  wordCounts: state.words.wordCounts
});

export default connect(mapStateToProps, {
  setCurrentSoundItem,
  getWordCounts
})(withStyles(styles)(SimpleTable));
