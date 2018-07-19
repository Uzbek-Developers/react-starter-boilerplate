import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from "./redux/reducers/reducers"
import thunk from "redux-thunk"
import logger from "redux-logger"
import {persistStore, persistReducer} from "redux-persist"
import storage from "localforage"
import stateReconciler from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import ApiMiddleware from "./middleware/ApiMiddleware"
import {createEpicMiddleware} from "redux-observable"
import epics from "./redux/rx-epics/rootEpic"

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["storage"],
    stateReconciler
}
const epicMiddleware = createEpicMiddleware()

export default function configureStore(initialState = {}) {
    console.log("initialState === ", initialState)
    // console.log("env === ", process.env.NODE_ENV)
    //

    const middleware = [epicMiddleware, ApiMiddleware, thunk]
    if (process.env.NODE_ENV !== "production") {
        middleware.push(logger)
    }

    // return new Promise((resolve, reject) => {
    //   try {
    const persisterReducer = persistReducer(persistConfig, rootReducer)
    const composedEnhancers = compose(applyMiddleware(...middleware))

    const store = createStore(
        persisterReducer,
        initialState,
        composedEnhancers
    )

    epicMiddleware.run(epics)
    persistStore(store, null)
    return store;
    // } catch (e) {
    //   reject(e)
    // }
// }
// )
}
