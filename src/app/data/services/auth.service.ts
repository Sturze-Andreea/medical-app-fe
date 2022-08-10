import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { apiPath } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers: any;
  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    });
  }

  readonly baseURL = `${apiPath}/users`;

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}`);
  }

  getDoctors(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/doctors`);
  }

  login(email: string, password: string) {
    this.httpClient
      .post(
        `${this.baseURL}/auth`,
        {
          email: email,
          password: password,
        },
        { headers: this.headers }
      )
      .subscribe(
        (data: any) => {
          this.tokenStorage.saveToken(data['token']);
          this.tokenStorage.saveUser(data['email']);
          this.tokenStorage.saveId(data['id']);
          // this.tokenStorage.saveRole(data['role']);
          this.router.navigate(['/']);
        },
        (err: any) => {
          this.notifyService.showError('Email sau Parolă invalidă', '');
        }
      );
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return this.httpClient.post(
      `${this.baseURL}/register`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      { headers: this.headers }
    );
  }

  update(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    if (password === '') {
      return this.httpClient.put(
        `${this.baseURL}/${id}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        { headers: this.headers }
      );
    }
    return this.httpClient.put(
      `${this.baseURL}/${id}`,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      { headers: this.headers }
    );
  }

  logout() {
    this.tokenStorage.signOut();
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
