import * as fromUi from "./shared/ui.reducer";
import * as fromAuth from './auth/auth.reducer'
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export interface AppState {
  ui: fromUi.UiState,
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.UiState>('ui')
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
