import { getUserState } from "./getUser/getUser.reducer";

export interface AppState {
  user: getUserState
}