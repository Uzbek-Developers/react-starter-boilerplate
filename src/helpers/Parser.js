export function parseSelectItemList(callback) {
  return parserCallback(callback, response => {
    // let list = [];
    // if (list) {
    //     list.map((item)=> {
    //         let selectItem = new SelectItem();
    //         selectItem.readFromJSON(item);//Todo Furthermore, perhaps i will parse per item through SelectItem model
    // data.push(item)
    // })
    // }
    return response.body && response.body.status && response.body.data
      ? response.body.data
      : response.body
  })
}

export function parserCallback(callback, fnCallback) {
  return (error, response) => {
    if (response && response.body) {
      var responseData = response.body
      if (fnCallback) {
        responseData = fnCallback(response)
      }
      response = {
        body: {
          statusCode: 2,
          status: "success",
          data: responseData
        }
      }
    }
    callback(error, response)
  }
}
