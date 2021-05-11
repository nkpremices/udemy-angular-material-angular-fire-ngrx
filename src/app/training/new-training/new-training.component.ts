import {Component, OnDestroy, OnInit } from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {Observable, Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import * as fromTraining from '../training.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises$: Observable<Exercise[]> | undefined
  private subscriptions: Subscription[] = []

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
  }

  onStartTraining(f: NgForm) {
    console.log(f)
    this.trainingService.startExercise(f.value.exercise)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  onChange(e: any) {
    this.trainingService.startExercise(e)
  }
}
