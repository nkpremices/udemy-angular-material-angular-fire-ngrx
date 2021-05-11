import {Action} from "@ngrx/store";

export enum UiActionsEn {
  START_LOADING = '[UI]/START_LOADING',
  STOP_LOADING = '[UI]/STOP_LOADING'
}

export class StartLoading implements Action {
  readonly type = UiActionsEn.START_LOADING as string
}

export class StopLoading implements Action {
  readonly type = UiActionsEn.STOP_LOADING as string
}

export type UiActions = StartLoading | StopLoading
