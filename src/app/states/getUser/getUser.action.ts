import { UserProfile } from "../../user/user-profile/user-profile.interface";
import { createAction, props } from "@ngrx/store";


//Action to get the user who is logged in
export const getUser = createAction('[GetUser Component] getUser')

//Action if GetUser is success
export const getUserSuccess = createAction(
  '[GetUser Component] getUserSuccess',
  props<{ user: UserProfile }>()
)

//Action if GetUser is failure
export const getUserError = createAction(
  '[GetUser Component] getUserError',
  props<{ errorMessage: string }>()
)

//Actionf if logout
export const logoutUser = createAction(
  '[AuthButton Component] LogoutUser'
)