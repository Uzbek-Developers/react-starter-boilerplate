import createReducer from "./createReducer"
import * as ActionType from "./../actionTypes/appType"

const defaultState = {
    init: null
}

const reducers = {
    [ActionType.INIT_APP](state) {
        return {
            ...state,
            init: true
        }
    }
}

export default createReducer(defaultState, reducers)
