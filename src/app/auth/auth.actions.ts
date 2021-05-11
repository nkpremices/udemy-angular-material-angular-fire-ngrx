import {Action} from "@ngrx/store";

export enum AuthActionsEn {
  SET_AUTHENTICATED = '[Auth]/SET_AUTHENTICATED',
  SET_UNAUTHENTICATED = '[Auth]/SET_UNAUTHENTICATED'
}

export class SetAuthenticated implements Action {
  readonly type = AuthActionsEn.SET_AUTHENTICATED as string
}

export class SetUnauthenticated implements Action {
  readonly type = AuthActionsEn.SET_UNAUTHENTICATED as string
}

export type AuthActions = SetAuthenticated | SetUnauthenticated
