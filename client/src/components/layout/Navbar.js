import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab } from "@material-ui/core";
import {
  initSoundItems,
  getCategoryNames,
  setCurrentCategory,
  setCurrentSoundItem,
  initSelector
} from "../../actions/soundItemActions";

const styles = {
  root: {
    flexGrow: 1
  }
};

class CenteredTabs extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    //should make soundItems available through redux soundItems.soundItems
    this.props.initSoundItems();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.soundItems !== this.props.soundItems) {
      this.props.getCategoryNames(this.props.soundItems);
      this.props.initSelector(this.props.soundItems);
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.setCurrentCategory(this.props.categories[value]);
    this.props.setCurrentSoundItem(null);
  };

  render() {
    const { classes, categories } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          scrollable
          scrollButtons="auto"
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
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
  setCurrentCategory: PropTypes.func.isRequired,
  initSoundItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  soundItems: state.soundItems.soundItems,
  // categories: state.auth.categoryNames
  categories: state.soundItems.categoryNames
});

export default connect(mapStateToProps, {
  setCurrentCategory,
  initSoundItems,
  getCategoryNames,
  initSelector,
  setCurrentSoundItem
})(withStyles(styles)(CenteredTabs));
