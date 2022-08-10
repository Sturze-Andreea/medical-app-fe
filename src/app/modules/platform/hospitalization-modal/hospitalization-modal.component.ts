import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Hospitalization } from 'src/app/data/models/hospitalization.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { NotificationService } from 'src/app/data/services/notification.service';
import { PacientService } from 'src/app/data/services/pacient.service';

@Component({
  selector: 'app-hospitalization-modal',
  templateUrl: './hospitalization-modal.component.html',
  styleUrls: ['./hospitalization-modal.component.scss'],
})
export class HospitalizationModalComponent implements OnInit {
  hospitalizationForm: FormGroup;
  doctors: any[] = [];
  patients: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<HospitalizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private hospitalizationService: HospitalizationService,
    private authService: AuthService,
    private patientService: PacientService
  ) {}

  ngOnInit() {
    this.authService.getDoctors().subscribe((data: any) => {
      this.doctors = data;
    });
    this.patientService.refreshList().subscribe((data: any) => {
      this.patients = data;
    });
    if (!this.data.ward) {
      this.hospitalizationForm = this.formBuilder.group({
        hospitalizationId: [this.data.hospitalizationId, [Validators.required]],
        wardId: [this.data.wardId, [Validators.required]],
        patientId: [this.data.patientId, [Validators.required]],
        date: [this.data.date.substring(0, 10), [Validators.required]],
        roomNr: [this.data.roomNr, [Validators.required]],
        bedNr: [this.data.bedNr, [Validators.required]],
        doctor: [this.data.doctor, [Validators.required]],
        immobilized: [this.data.immobilized, [Validators.required]],
        allergies: [this.data.allergies, []],
        diet: [this.data.diet, []],
        contactPersonName: [this.data.contactPersonName, [Validators.required]],
        contactPersonPhoneNr: [
          this.data.contactPersonPhoneNr,
          [Validators.required],
        ],
        dependecy: [this.data.dependecy, [Validators.required]],
        fallingRisk: [this.data.fallingRisk, [Validators.required]],
        discharged: [this.data.discharged, [Validators.required]],
      });
      this.hospitalizationForm.get('patientId')?.disable();
    } else {
      this.hospitalizationForm = this.formBuilder.group({
        hospitalizationId: [0, []],
        wardId: [this.data.ward, [Validators.required]],
        patientId: ['', [Validators.required]],
        date: ['', [Validators.required]],
        roomNr: ['', [Validators.required]],
        bedNr: ['', [Validators.required]],
        doctor: ['', [Validators.required]],
        immobilized: [false, [Validators.required]],
        allergies: ['', []],
        diet: ['', []],
        contactPersonName: ['', [Validators.required]],
        contactPersonPhoneNr: ['', [Validators.required]],
        dependecy: ['', [Validators.required]],
        fallingRisk: ['', [Validators.required]],
        discharged: [false, [Validators.required]],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.data.ward) {
      this.hospitalizationService.formData = this.hospitalizationForm
        .value as Hospitalization;
      this.hospitalizationService.add().subscribe(
        (data: any) => {
          this.close();
        },
        (err: any) => {
          this.notifyService.showError(err, '');
        }
      );
    } else {
      this.hospitalizationForm.get('patientId')?.enable();
      this.hospitalizationService.formData = this.hospitalizationForm
        .value as Hospitalization;
      this.hospitalizationService.edit().subscribe(
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
