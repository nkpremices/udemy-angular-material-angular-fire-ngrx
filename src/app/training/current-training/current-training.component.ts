import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training.component";
import {TrainingService} from "../training.service";
import * as fromTraining from '../training.reducer';
import {Store} from "@ngrx/store";
import {Exercise} from "../exercise.model";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Output()
  trainingExit = new EventEmitter()

  progress = 0;
  timer: number | undefined;
  private subscriptions: Subscription[] = []

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  onStop () {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        return this.trainingService.cancelExercise(this.progress)
      }
      return this.startOrResumeTimer();
    })
  }

  startOrResumeTimer() {
    const timerSubscription = this.store.select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        const step = (ex as Exercise).duration / 100 * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if(this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer)
          }
        }, step);
      });
    this.subscriptions.push(timerSubscription)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe())
  }

}
