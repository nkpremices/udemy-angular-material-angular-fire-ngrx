import {AuthActions, AuthActionsEn} from "./auth.actions";

export interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AuthActionsEn.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      }
    case AuthActionsEn.SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated
