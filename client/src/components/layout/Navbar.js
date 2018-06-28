import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { setCurrentCategory } from "../../actions/soundItemActions";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CenteredTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.setCurrentCategory(this.props.categories[value]);
  };

  render() {
    const { classes, categories } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {categories.map(item => <Tab key={item} label={item} />)}
        </Tabs>
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  setCurrentCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  categories: state.auth.categoryNames
});

export default connect(mapStateToProps, {
  setCurrentCategory
})(withStyles(styles)(CenteredTabs));
