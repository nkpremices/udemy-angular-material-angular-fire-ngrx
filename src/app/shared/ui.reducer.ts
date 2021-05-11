import {UiActions, UiActionsEn} from "./ui.actions";

export interface UiState {
  isLoading: boolean
}

const initialState: UiState = {
  isLoading: false
}

export function uiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
    case UiActionsEn.START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case UiActionsEn.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export const getIsLoading = (state: UiState) => state.isLoading
