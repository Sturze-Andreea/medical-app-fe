import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/data/services/auth.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.userForm = this.formBuilder.group({
        email: [this.data.email, [Validators.required, Validators.email]],
        password: ['', []],
        firstName: [this.data.firstName, [Validators.required]],
        lastName: [this.data.lastName, [Validators.required]],
      });
    } else {
      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.data) {
      this.authService
        .update(
          this.data.userId,
          this.userForm.controls.email.value,
          this.userForm.controls.password.value,
          this.userForm.controls.firstName.value,
          this.userForm.controls.lastName.value
        )
        .subscribe(
          (data: any) => {
            this.close();
          },
          (err: any) => {
            this.notifyService.showError(err, '');
          }
        );
    } else {
      this.authService
        .register(
          this.userForm.controls.email.value,
          this.userForm.controls.password.value,
          this.userForm.controls.firstName.value,
          this.userForm.controls.lastName.value
        )
        .subscribe(
          (data: any) => {
            this.close();
          },
          (err: any) => {
            this.notifyService.showError(err, '');
          }
        );
    }
  }
}
