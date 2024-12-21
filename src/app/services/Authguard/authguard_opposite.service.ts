import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "../API/auth.service";
import { CommonService } from "../common/common.service";


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService_opposite implements CanActivate {

  private authService = inject(AuthService)
  private router = inject(Router)
  private common = inject(CommonService)

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated.pipe(
      take(1), // Take the first emitted value from the BehaviorSubject
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate([''])
          return false; //Block route access
        } else {
          return true; //Allow access
        }
      })
    );
  }
}

