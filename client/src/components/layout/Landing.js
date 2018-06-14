import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/sounds");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="attribution">
          <Typography id="attribution">
            Photo by Thought Catalog on Unsplash
          </Typography>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
