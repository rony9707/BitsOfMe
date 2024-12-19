import { createReducer, on } from "@ngrx/store"
import { UserProfile } from "../../user/user-profile/user-profile.interface";
import * as getUserActions from './getUser.action';


export interface getUserState {
  user: UserProfile | null,
  error: string | null
}


//Initial State of getUser
export const initialGetUser: getUserState = {
  user: null,
  error: null
}



export const getUserReducer = createReducer(
  initialGetUser,

  //If get user is success
  on(getUserActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),

  //If get user is failure
  on(getUserActions.getUserError, (state, { errorMessage }) => (
    {
      ...state,
      error: errorMessage,
    })),

  //If user logs out
  on(getUserActions.logoutUser, (state) => ({
    ...state,
    user:null,
  })),

);