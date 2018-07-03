import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { setCurrentStudent, getCurrentWords } from "../actions/wordActions";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    student: "Select a student"
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentStudent !== prevProps.currentStudent) {
      this.setState({ student: this.props.currentStudent.name });
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = student => {
    this.setState({
      anchorEl: null,
      student: student && student.name ? student.name : "Select a student"
    });

    //the extra condition is to handle clicking outside menu
    if (student && student.name) {
      this.props.setCurrentStudent(student);
      this.props.getCurrentWords(student._id);
    }
  };

  render() {
    const { anchorEl } = this.state;
    const { students, currentStudent } = this.props;

    let button = currentStudent ? currentStudent.name : this.state.student;

    let studentItems =
      students && students.length > 0
        ? students.map(student => (
            <MenuItem
              onClick={() => this.handleClose(student)}
              key={student._id ? String(student._id) : null}
            >
              {student.name}
            </MenuItem>
          ))
        : null;

    return (
      <div id="student-selector">
        <Button
          id="selector-font"
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {button}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {studentItems}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  students: state.words.students
});

export default connect(mapStateToProps, { setCurrentStudent, getCurrentWords })(
  SimpleMenu
);
