import React from "react";
import PropTypes from "prop-types";
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
      subCategories: ["long vowel sounds", "Short vowel sounds"],
      subCategory: "Select A Category"
    };
    this.selectSubCat.bind(this);
  }
  //when component mounts, we will have or not have sub cats and update subCats accordingly

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  selectSubCat = (e, item) => {
    e.preventDefault();
    console.log(item);
    this.setState({ subCategory: item });
  };

  render() {
    const { classes } = this.props;

    const subcategoryList = this.state.subCategories.map((item, index) => (
      <ListItem onClick={e => this.selectSubCat(e, item)} key={index}>
        {item}
      </ListItem>
    ));

    const sideList = (
      <div className={classes.list}>
        <List>{subcategoryList}</List>
      </div>
    );

    const subCatSelectButton =
      this.state.subCategories.length > 0 ? (
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={this.toggleDrawer("left", true)}
        >
          {this.state.subCategory}
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

export default withStyles(styles)(TemporaryDrawer);
