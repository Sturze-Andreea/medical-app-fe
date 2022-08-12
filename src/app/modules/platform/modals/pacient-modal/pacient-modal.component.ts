import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/data/services/notification.service';
import { PacientService } from 'src/app/data/services/pacient.service';

@Component({
  selector: 'app-pacient-modal',
  templateUrl: './pacient-modal.component.html',
  styleUrls: ['./pacient-modal.component.scss'],
})
export class PacientModalComponent implements OnInit {
  patientForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PacientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private patientService: PacientService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.patientForm = this.formBuilder.group({
        cnp: [
          this.data.cnp,
          [
            Validators.required,
            Validators.min(1000000000000),
            Validators.max(9999999999999),
          ],
        ],
        dob: [this.data.dob.substring(0,10), [Validators.required]],
        firstName: [this.data.firstName, [Validators.required]],
        lastName: [this.data.lastName, [Validators.required]],
      });
    } else {
      this.patientForm = this.formBuilder.group({
        cnp: [
          '',
          [
            Validators.required,
            Validators.min(1000000000000),
            Validators.max(9999999999999),
          ],
        ],
        dob: [null, [Validators.required]],
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
      this.patientService.formData.pacientId = this.data.patientId;
      this.patientService.formData.firstName =
        this.patientForm.controls.firstName.value;
      this.patientService.formData.lastName =
        this.patientForm.controls.lastName.value;
      this.patientService.formData.dob = this.patientForm.controls.dob.value;
      this.patientService.formData.cnp = String(
        this.patientForm.controls.cnp.value
      );
      this.patientService.edit().subscribe(
        (data: any) => {
          this.close();
        },
        (err: any) => {
          this.notifyService.showError(err, '');
        }
      );
    } else {
      this.patientService.formData.firstName =
        this.patientForm.controls.firstName.value;
      this.patientService.formData.lastName =
        this.patientForm.controls.lastName.value;
      this.patientService.formData.dob = this.patientForm.controls.dob.value;
      this.patientService.formData.cnp = String(
        this.patientForm.controls.cnp.value
      );
      this.patientService.add().subscribe(
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
