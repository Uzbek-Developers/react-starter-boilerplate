import * as ActionType from "../actionTypes/appType"
import DataApi from "../../api/DataApi"

export function initAction() {
  return (dispatch, getState) => {
    dispatch({
      type: ActionType.INIT_APP,
    });
    dispatch(getDataFn());
  }
}


function getDataFn(data) {
  return {
    api: DataApi.getData,
    types: [
      ActionType.GET_DATA_START,
      ActionType.GET_DATA_SUCCESS,
      ActionType.GET_DATA_ERROR
    ],
    data
  }
}