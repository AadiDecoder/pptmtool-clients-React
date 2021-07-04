import axios from "axios";
import { GET_ERRORS } from "../actions/types";

export const addProjectTask = (backlogId, projectTask, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `http://localhost:8080/api/backlog/${backlogId}`,
      projectTask
    );
    history.goBack();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
