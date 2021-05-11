import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "./training.service";
import {Observable, Subscription} from "rxjs";
import * as fromTraining from './training.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining$: Observable<boolean> | undefined;

  subscriptions: Subscription[] = []

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
