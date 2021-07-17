import axios from "axios";
import { GET_ERRORS, GET_BACKLOG } from "../actions/types";

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

export const getBacklog = (backlogId) => async (dispatch) => {
  try {
    const resp = await axios.get(
      `http://localhost:8080/api/backlog/${backlogId}`
    );
    dispatch({
      type: GET_BACKLOG,
      payload: resp.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
