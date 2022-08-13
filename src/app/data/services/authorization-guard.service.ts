import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService implements CanActivate{

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!route.data) {
      return true;
    } else {
      const isAuthorized = this.authorizationService.isAuthorized(
        route.data.authorization
      );
      
      if (!isAuthorized) {
        this.router.navigate(['']);
      }
  
      return isAuthorized;
    }
  }

}
