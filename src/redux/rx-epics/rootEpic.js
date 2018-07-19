import { combineEpics } from "redux-observable"
import { actionEpic } from "./appEpic"

const rootEpic = combineEpics(
  actionEpic,
)

export default rootEpic
