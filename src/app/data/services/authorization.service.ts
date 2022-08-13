import { Injectable } from '@angular/core';
import { RoleService } from './role.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private roleService: RoleService,
     private tokenService: TokenStorageService) {}

  public isAuthorized(authorization: any): boolean {
    if (authorization && authorization.roles && authorization.roles.length) {
      return this.isAuthorizedForRoles(authorization.roles);
    } else {
      return true;
    }
  }

  public isAuthorizedForRoles(roles: any): boolean {
    const userRole = this.tokenService.getRole();
    if (userRole && userRole.length) {
      const foundUserRoles = roles.filter((elem: string) => userRole === elem);
      return foundUserRoles.length > 0;
    }
    return false;
  }

}
