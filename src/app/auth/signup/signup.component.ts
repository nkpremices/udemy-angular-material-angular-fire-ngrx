import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {UiService} from "../../shared/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date | undefined;
  isLoading = false;
  private subscriptions: Subscription[] = []

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(f: NgForm) {
    const loadingSubscription = this.uiService
      .loadingStateChanged
      .subscribe(state => this.isLoading = state);

    this.subscriptions.push(loadingSubscription);
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
