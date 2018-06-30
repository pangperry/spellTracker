import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setCurrentSubcategory,
  setCurrentSoundItem
} from "./../actions/soundItemActions";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { List, ListItem, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    marginTop: 20,
    marginLeft: 45,
    marginBottom: 10
  }
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      subcategory: "Select A Subcategory",
      categoriesObj: {}
    };
    this.selectSubCat.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ subcategory: "Select A Subcategory" });
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  selectSubCat = (e, item) => {
    e.preventDefault();
    this.setState({ subcategory: item });
    this.props.setCurrentSubcategory(item);
    this.props.setCurrentSoundItem(null);
  };

  render() {
    const { classes, category, selector } = this.props;

    const subcategories = selector
      ? selector[category] || ["none"]
      : ["selector loading"];

    const subcategoryList = subcategories.map((item, index) => (
      <ListItem onClick={e => this.selectSubCat(e, item)} key={index}>
        {item}
      </ListItem>
    ));

    const sideList = (
      <div className={classes.list}>
        <List>{subcategoryList}</List>
      </div>
    );

    const noSubCats = selector
      ? !selector[category] ||
        (selector[category].length === 1 && !selector[category][0])
      : false;

    const subCatSelectButton = !noSubCats ? (
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={this.toggleDrawer("left", true)}
      >
        {this.state.subcategory}
      </Button>
    ) : null;

    return (
      <div>
        {subCatSelectButton}
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  // selector: state.auth.selector,
  category: state.soundItems.currentCategory,
  selector: state.soundItems.selector
});
export default connect(mapStateToProps, {
  setCurrentSubcategory,
  setCurrentSoundItem
})(withStyles(styles)(TemporaryDrawer));
