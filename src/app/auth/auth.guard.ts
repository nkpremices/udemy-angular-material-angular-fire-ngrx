import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import * as fromRoot from '../app.reducer';
import {Store} from "@ngrx/store";
import {take} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad (route: Route, segments: UrlSegment[]) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
