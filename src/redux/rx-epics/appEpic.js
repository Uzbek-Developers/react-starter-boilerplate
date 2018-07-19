import * as AppType from "../actionTypes/appType"
import {
    initAction
} from "../actions/appActions"
import {of} from "rxjs"
import {filter, debounceTime, mergeMap, takeUntil} from "rxjs/operators"

export const actionEpic = action$ => {
    return action$.pipe(
        filter(action => action.type === "TEST"),
        debounceTime(100),
        mergeMap(action => of(initAction()))
    )
}