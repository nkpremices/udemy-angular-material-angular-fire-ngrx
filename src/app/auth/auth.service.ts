import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";
import {UiService} from "../shared/ui.service";
import {Store} from "@ngrx/store";
import * as fromRootReducer from "../app.reducer";
import * as UI from '../shared/ui.actions';
import * as AUTH from '../auth/auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRootReducer.AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe(user => {
     if(user) {
       this.store.dispatch(new AUTH.SetAuthenticated())
       this.router.navigate(['/training']);
     } else {
       this.store.dispatch(new AUTH.SetUnauthenticated())
       this.router.navigate(['/login']);
     }
    });
  }

  registerUser({email, password}: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(e => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(e.message, undefined, 3000)
      });
  }

  login({email, password}: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(e => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(e.message, undefined, 3000);
      })
  }

  logout() {
    this.auth.signOut();
    this.trainingService.cancelSubscriptions();
  }
}
