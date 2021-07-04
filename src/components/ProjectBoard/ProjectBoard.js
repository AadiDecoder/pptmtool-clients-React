import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "../ProjectBoard/Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
import { boardAlgo } from "../../function/commonFunction";

class ProjectBoard extends Component {
  //constructor to handler errors

  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id);
  }
  //we can also use componentWillReceiveProps(nextProps) , but this is deprecated , now we use below static lifecycle method
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
      };
    }
    return state;
  }
  render() {
    const { project_tasks } = this.props.backlog;
    const { id } = this.props.match.params;
    const { errors } = this.state;

    let BoardContent;

    BoardContent = boardAlgo(errors, project_tasks);

    return (
      <div className="container">
        <Link
          to={{
            pathname: `/addProjectTask/${id}`,
            backLocation: id,
          }}
          className="btn btn-primary mb-3"
        >
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
