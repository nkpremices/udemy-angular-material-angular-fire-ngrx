import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import * as fromTraining from '../training.reducer';
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-pas-trainings',
  templateUrl: './pas-trainings.component.html',
  styleUrls: ['./pas-trainings.component.scss']
})
export class PasTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>()
  subscriptions: Subscription[] = []

  @ViewChild(MatSort)
  sort: MatSort | undefined;
  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;

  constructor(
    private trainingService: TrainingService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const finishedExercisesSubscription = this.store.select(fromTraining.geFinishedExercises).subscribe((exercises) => {
      this.dataSource.data = exercises as Exercise[]
    });
    this.subscriptions.push(finishedExercisesSubscription);
    this.trainingService.fetchPastOrCompletedExercises();
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort
  }

  doFilter(value: any) {
    this.dataSource.filter = value.value.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
