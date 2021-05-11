import {Exercise} from "./exercise.model";
import { Subscription} from "rxjs";
import {map, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {UiService} from "../shared/ui.service";
import * as fromTraining from './training.reducer';
import * as TRAINING from './training.actions';
import {Store} from "@ngrx/store";

@Injectable()
export class TrainingService {
  private subscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {
  }

  fetchAvailableExercises() {
    return this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(el => ({
          id: el.payload.doc.id,
          ...el.payload.doc.data() as any
        }))
      }))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new TRAINING.SetAvailableTrainings(exercises));
      }, error => {
        this.uiService
          .showSnackbar('Fetching exercises failed, please try again later', undefined, 3000)
      })
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TRAINING.StartTraining(selectedId));
  }

  completeExercise() {
    this.subscriptions
      .push(this.store.select(
        fromTraining.getActiveTraining)
        .pipe(take(1))
        .subscribe(el => {
          this.addDataToDatabase({
            ...el as Exercise,
            date: new Date(),
            state: 'completed'
          })
          this.store.dispatch(new TRAINING.StopTraining());
        }))
  }

  cancelExercise(progressMade: number) {
    this.subscriptions.push(this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(el => {
        this.addDataToDatabase({
          ...el as Exercise,
          date: new Date(),
          state: 'cancelled',
          duration: (el as Exercise).duration as number * (progressMade / 100),
          calories: (el as Exercise).calories as number * (progressMade / 100)
        })
        this.store.dispatch(new TRAINING.StopTraining());
      }));
  }

  fetchPastOrCompletedExercises() {
    return this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises) => {
        this.store.dispatch(new TRAINING.SetFinishedTrainings(exercises as Exercise[]));
      });
  }

  cancelSubscriptions() {
    this.subscriptions.forEach(el => el.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
