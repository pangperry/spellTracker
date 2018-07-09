import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { addWord } from "../actions/wordActions";

class FormDialog extends React.Component {
  state = {
    open: false,
    spelling: "",
    misspelling: "",
    sentence: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = type => {
    this.setState({ open: false });
    if (type === "save") {
      const word = {
        spelling: this.state.spelling,
        misspelling: this.state.misspelling,
        sentence: this.state.sentence,
        student_id: this.props.currentStudent._id,
        item_id: this.props.currentSoundItem._id,
        category: this.props.currentSoundItem.category,
        subcategory: this.props.currentSoundItem.subcategory,
        needsWork: true,
        level: this.props.currentSoundItem.level
      };

      this.props.addWord(
        word.student_id,
        word.item_id,
        word,
        this.props.currentWords ? this.props.currentWords.slice() : []
      );

      this.setState({
        ...this.state,
        open: false,
        spelling: "",
        misspelling: "",
        sentence: ""
      });
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
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          disabled={this.props.disableButton}
        >
          Add Word
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Word</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter word you want to track
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="spelling"
              name="spelling"
              value={this.state.spelling}
              onChange={this.handleChange("spelling")}
              label="spelling"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="misspelling"
              name="misspelling"
              value={this.state.misspelling}
              onChange={this.handleChange("misspelling")}
              label="misspelling"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="sentence"
              label="sentence"
              value={this.state.sentence}
              onChange={this.handleChange("sentence")}
              type="text"
              placeholder="(Optional)"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose("cancel")} color="primary">
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
const mapStateToProps = state => ({
  currentSoundItem: state.soundItems.currentSoundItem,
  currentStudent: state.words.currentStudent,
  currentWords: state.words.currentWords,
  currentCategory: state.soundItems.currentCategory,
  currentSubcategory: state.soundItems.currentSubcategory
});
export default connect(mapStateToProps, { addWord })(FormDialog);
