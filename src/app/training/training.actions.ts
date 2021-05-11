import {Action} from "@ngrx/store";
import {Exercise} from "./exercise.model";

export enum TrainingsActionsEn {
  SET_AVAILABLE_TRAININGS = '[Training]/SET_AVAILABLE_TRAININGS',
  SET_FINISHED_TRAININGS = '[Training]/SET_FINISHED_TRAININGS',
  START_TRAINING = '[Training]/START_TRAINING',
  FINISH_TRAINING = '[Training]/FINISH_TRAINING',
}

export class SetAvailableTrainings implements Action {
  readonly type = TrainingsActionsEn.SET_AVAILABLE_TRAININGS as string

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = TrainingsActionsEn.SET_FINISHED_TRAININGS as string

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = TrainingsActionsEn.START_TRAINING as string

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = TrainingsActionsEn.START_TRAINING as string
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;
