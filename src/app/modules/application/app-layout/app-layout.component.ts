import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth.service';
import { TokenStorageService } from 'src/app/data/services/token-storage.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  role: string = ''
  constructor(public router: Router, private authService: AuthService, private tokenService: TokenStorageService) {
    this.role = this.tokenService.getRole()
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
