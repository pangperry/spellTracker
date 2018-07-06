import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { addStudent } from "../actions/wordActions";

class FormDialog extends React.Component {
  state = {
    open: false,
    name: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = name => {
    //TODO: add validation and move setState into condition
    this.setState({ open: false });
    if (name === "save") {
      this.props.addStudent({ name: this.state.name });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add student</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
          <DialogContent>
            <DialogContentText>Please add the student's name</DialogContentText>
            <h1>{this.state.name}</h1>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
              value={this.state.value}
              fullWidth
              onChange={this.handleChange("name")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose("save")} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { addStudent })(FormDialog);
