import {
  doGet,
  doPut,
  doPost,
  doDelete,
  CATEGORY_ROOT
} from "./../api/HttpClient"

const CategoryApi = {
  getData(data, callback) {
    return doGet("", data, callback)
  }
}

export default CategoryApi
