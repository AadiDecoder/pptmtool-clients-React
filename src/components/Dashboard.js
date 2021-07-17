import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
class Dashboard extends Component {
  //lifecycle hook
  //when component load , this gets execute
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props.projects;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />

              <br />
              <hr />
              {projects.map((proj) => (
                <ProjectItem key={proj.id} project={proj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  projects: state.project,
});

Dashboard.propTypes = {
  projects: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { getProjects })(Dashboard);
