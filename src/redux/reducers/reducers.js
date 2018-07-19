import {combineReducers} from "redux"
// import {reducer as formReducer} from "redux-form"

import app from "./appReducer"
import storage from "./storageReducer"

const rootReducer = combineReducers({
    app,
    storage
})

export default rootReducer
