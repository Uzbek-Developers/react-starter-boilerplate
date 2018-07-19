import fp from "lodash/fp"
import { HOST } from "../constants/Host"
const ResStatus = {
  Success: "SUCCESS",
  Fail: "FAIL"
}
export const isSuccess = res =>
  fp.flow(fp.get("status"), fp.eq(ResStatus.Success))

export const getApiResourcePath = url => HOST + url

export const isFailed = fp.flow(fp.get("httpStatusCode"), fp.negate(fp.eq(200)))

export const getErrorMessage = fp.flow(fp.get("error.response.data.message"))

export const validateResponse = (response, dispatch) => {
  const commonErrorMessage = ""
  if (response && isFailed(response)) {
    console.log("ERROR  ===", response.message, response.serverMessage)

    if (response.message) {
      if (response.message.indexOf("Request has been terminated") > -1) {
        return "Не удаётся установить связь с сервером. Пожалуйста, проверьте соединение с интернетом"
      }
      if (
        response.message.indexOf("Пользователь заблокирован") > -1 ||
        response.serverMessage.indexOf("Session expired") > -1 ||
        response.serverMessage.indexOf("Время вашей рабочей сессии истекло") >
          -1
      ) {
        dispatch({
          type: "LOGOUT_CURRENT_USER",
          error: response.serverMessage
        })
        return response.serverMessage
      }

      if (response.message.indexOf("could not execute query; SQL") > -1) {
        return commonErrorMessage
      }
    }

    return (response.message || "Произошла ошибка") + "\n"
  }

  return commonErrorMessage
}
