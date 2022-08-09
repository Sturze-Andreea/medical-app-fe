import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate() {
    const token = this.tokenStorage.getToken();
    if (token) {
      if (this.tokenExpired(token)) {
        this.router.navigate(['/login']);
        this.tokenStorage.signOut();
        return false;
      } else return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  
}
