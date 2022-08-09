import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }
  register(): void {
    this.authService
      .register(
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.firstName.value,
        this.registerForm.controls.lastName.value
      )
      .subscribe((data: any) => {
        this.router.navigate(['/login']);
      },(err:any)=>{
        this.notifyService.showError(err, '');
      });
  }
}
