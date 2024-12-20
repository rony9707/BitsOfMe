import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getUserState } from "./getUser.reducer";


export const selectGetUserFeature = createFeatureSelector<getUserState>('user');


export const getAllUser = createSelector(
  selectGetUserFeature,
  (state: getUserState) => state.user
)

export const selectUserError = createSelector(
  selectGetUserFeature,
  (state: getUserState) => state.error
);