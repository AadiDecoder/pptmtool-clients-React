import Backlog from "../components/ProjectBoard/Backlog";

export const boardAlgo = function (errors, project_tasks) {
  if (project_tasks.length < 1) {
    if (errors.project_Not_Found) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.project_Not_Found}
        </div>
      );
    } else {
      return (
        <div className="alert alert-info text-center" role="alert">
          No Project Tasks on this Board
        </div>
      );
    }
  } else {
    return <Backlog project_tasks={project_tasks} />;
  }
};
