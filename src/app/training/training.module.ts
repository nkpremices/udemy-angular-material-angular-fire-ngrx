import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PasTrainingsComponent} from "./pas-trainings/pas-trainings.component";
import {SharedModule} from "../shared/shared.module";
import {TrainingRoutingModule} from "./training-routing.module";
import {StoreModule} from "@ngrx/store";
import {trainingReducer} from "./training.reducer";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PasTrainingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule { }
