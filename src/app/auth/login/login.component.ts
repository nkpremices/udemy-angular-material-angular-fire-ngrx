import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRootReducer from "../../app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean> | undefined;
  private subscriptions: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<fromRootReducer.AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRootReducer.getIsLoading)
  }

  onSubmit(f: NgForm) {
    this.authService.login({
      email: f.value.email,
      password: f.value.password
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
