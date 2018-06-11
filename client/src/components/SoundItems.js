import React, { Fragment } from "react";
import PropTypes from "prop-types";
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
import data from "../seed/soundItems";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto",
    height: "100vh",
    overflowY: "auto"
  },
  table: {}
});

class SimpleTable extends React.Component {
  state = {
    selectedId: -1
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ selectedId: index });
    console.log(index);
  };

  isSelected = id => this.state.selectedId === id;

  render() {
    const { classes } = this.props;

    const tableRows = data.map(n => {
      const isSelected = this.isSelected(n.id);
      //count will need to be replaced with a query based on word with current student id and the n.id(current word id)
      const count = 6;
      return (
        <Fragment>
          <TableRow hover selected={isSelected} key={n.id}>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n.id)}
            >
              {n.sound}
            </TableCell>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n.id)}
            >
              {n.spelling}
            </TableCell>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n.id)}
            >
              {n.keyword}
            </TableCell>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n.id)}
            >
              {n.level}
            </TableCell>
            <TableCell
              padding="dense"
              onClick={event => this.handleClick(event, n.id)}
            >
              {n.syllableType}
            </TableCell>
            <TableCell padding="dense">
              {count > 0 ? (
                <Typography color="primary">{count}</Typography>
              ) : (
                <Typography color="default">{count}</Typography>
              )}
            </TableCell>
          </TableRow>
        </Fragment>
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
        <SubcategoryNav />
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

export default withStyles(styles)(SimpleTable);
