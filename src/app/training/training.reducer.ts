import {Exercise} from "./exercise.model";
import * as fromRoot from '../app.reducer';
import {
  SetAvailableTrainings,
  SetFinishedTrainings,
  StartTraining,
  TrainingActions,
  TrainingsActionsEn
} from "./training.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface TrainingState {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  activeTraining: Exercise | null;
}

export interface State extends fromRoot.AppState {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  pastExercises: [],
  activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case TrainingsActionsEn.SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: (action as SetAvailableTrainings).payload
      }
    case TrainingsActionsEn.SET_FINISHED_TRAININGS:
      return {
        ...state,
        pastExercises: (action as SetFinishedTrainings).payload
      }

    case TrainingsActionsEn.START_TRAINING:
      return {
        ...state,
        activeTraining: state.availableExercises.find(ex => ex.id === (action as StartTraining).payload)
      }

    case TrainingsActionsEn.FINISH_TRAINING:
      return {
        ...state,
        activeTraining: null
      }
    default:
      return state
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const geFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.pastExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
