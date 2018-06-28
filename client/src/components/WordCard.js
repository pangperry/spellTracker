import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  card: {
    minWidth: 250,
    width: "100%"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class RecipeReviewCard extends React.Component {
  state = {
    expanded: false,
    checkedStar: true
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardActions className={classes.actions} disableActionSpacing>
            <Tooltip id="tooltip-icon" title="NEEDS WORK">
              <Checkbox
                checkedIcon={<Star />}
                icon={<StarBorder />}
                checked={this.state.checkedA}
                onChange={this.handleChange("checkedStar")}
                value="checkedStar"
              />
            </Tooltip>
          </CardActions>

          <CardHeader
            className={classes.header}
            action={
              <Tooltip id="tooltip-icon" title="ADD TO EXPORT LIST">
                <IconButton>
                  <Checkbox
                    checked={this.state.added}
                    onChange={this.handleChange("addedWord")}
                    value="addedWord"
                  />
                </IconButton>
              </Tooltip>
            }
            title="ashortword"
            subheader="ashortwordmispelled"
          />

          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Sentence:
              </Typography>
              <Typography paragraph> "a sentence"</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeReviewCard);
