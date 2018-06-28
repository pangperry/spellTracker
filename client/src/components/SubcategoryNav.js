import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setCurrentSubcategory
  // getSubcategories
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
      // hasSubcategories: false,
      categoriesObj: {}
    };
    this.selectSubCat.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ subcategory: "Select A Subcaegory" });
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
  };

  render() {
    const { classes, category, selector } = this.props;

    //selector is an object that outputs a list (if any) of
    //subcategory names for a given category name

    ///TODOS:
    //need to figure out why button isn't working correctly: all works, but consonants does not
    //when category changes, the button shouls change back to "select a subCategory"
    //watch vids on how to deal with global and component state: i.e., I want to filter the list items that are available in auth.teacher.state from within subnav
    // this.getSubcategories(category);
    const subcategories = selector[category] || ["none"];

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

    const noSubCats =
      !selector[category] ||
      (selector[category].length === 1 && !selector[category][0]);

    // const subCatSelectButton = !!selector[category] ? (
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
  selector: state.auth.selector,
  category: state.soundItems.currentCategory
});
export default connect(mapStateToProps, {
  setCurrentSubcategory
})(withStyles(styles)(TemporaryDrawer));
