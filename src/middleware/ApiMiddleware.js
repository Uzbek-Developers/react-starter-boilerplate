import * as ApiUtils from "../helpers/ApiUtils"

const ApiMiddleware = ({ dispatch, getState }) => next => action => {
  if (!action.api || !action.types) {
    return next(action)
  }
  const { api, types: [START, SUCCESS, ERROR], data } = action
  const request = data

  // const { cookie: { token, branchId, lang, userAgent } } = getState()

  const headers = {}

  // if (token) {
  //   headers["X-AUTH-TOKEN"] = token
  // }
  //   headers["device_info"] = navigator.userAgent
  //     headers["device_os"] = navigator.platform
  // console.log(headers)
  dispatch({
    type: START,
    request,
    data
  })

  return api(request, headers)
    .then(response => {
      const result = (response && response.data && response.data.data) || null

      if (ApiUtils.isFailed(response)) {
        const errorMessage = ApiUtils.validateResponse(response.data, dispatch)
        if (errorMessage) {
          dispatch({
            type: ERROR,
            error: errorMessage
          })
          return Promise.reject(errorMessage)
        }
      }

      dispatch({
        type: SUCCESS,
        data: result,
        request
      })

      return result
    })
    .catch(error => {
      if (!Boolean(error && typeof error == "string")) {
        const errorMessage =
          (error &&
            error.response &&
            error.response.data &&
            error.response.data.message) ||
          "Serverimiz bilan aloqa uzildi" ||
          (error && error.response && error.response.statusText)
        dispatch({
          type: ERROR,
          error: errorMessage
        })
        errorDisplay(errorMessage)
        //console.error("Api MIddleware === >  ", error, errorMessage)

        return Promise.reject(errorMessage)
      }

      return Promise.reject(error)

      // throw new Error(errorMessage);
    })
}
export default ApiMiddleware

let showError = true
function errorDisplay(errorMessage = "Error") {
  if (showError) {
    showError = false
    console.error(errorMessage)
    setTimeout(() => {
      showError = true
    }, 3000)
  }
}
