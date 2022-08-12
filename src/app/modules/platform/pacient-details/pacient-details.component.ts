import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientService } from 'src/app/data/services/pacient.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { Hospitalization } from 'src/app/data/models/hospitalization.model';
import { DetailsHospitalizationComponent } from '../details-hospitalization/details-hospitalization.component';
import { PacientDetails } from 'src/app/data/models/pacientDetails.model';
import { TempModalComponent } from '../temp-modal/temp-modal.component';
import { PulseModalComponent } from '../pulse-modal/pulse-modal.component';
import { BreathModalComponent } from '../breaths-modal/breaths-modal.component';
import { TaModalComponent } from '../ta-modal/ta-modal.component';
import { AllTemperaturesComponent } from '../all-temperatures/all-temperatures.component';
import { AllPulsesComponent } from '../all-pulses/all-pulses.component';
import { AllBreathsComponent } from '../all-breaths/all-breaths.component';
import { AllTasComponent } from '../all-tas/all-tas.component';

@Component({
  selector: 'app-pacient-details',
  templateUrl: './pacient-details.component.html',
  styleUrls: ['./pacient-details.component.scss'],
})
export class PacientDetailsComponent implements OnInit {
  hospitalization: Hospitalization = new Hospitalization();
  patient: Pacient = new Pacient();
  age: number = 0;
  details: PacientDetails = new PacientDetails();

  constructor(
    private pacientService: PacientService,
    private hospitalizationService: HospitalizationService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.hospitalizationId;
    this.hospitalizationService.getById(id).subscribe((res) => {
      this.hospitalization = res as Hospitalization;
      this.pacientService
        .getById(this.hospitalization.patientId)
        .subscribe((res) => {
          this.patient = res as Pacient;
          this.age = this.getAge(this.patient.dob);
        });
    });
    this.hospitalizationService.getDetails(id).subscribe((data: any) => {
      this.details = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.patient,
    });
  }

  getAge(date: Date): number {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  openDialogTemp(): void {
    const dialogRef = this.dialog.open(TempModalComponent, {
      data: { hospitalization: this.hospitalization.hospitalizationId },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogPulse(): void {
    const dialogRef = this.dialog.open(PulseModalComponent, {
      data: { hospitalization: this.hospitalization.hospitalizationId },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogBreath(): void {
    const dialogRef = this.dialog.open(BreathModalComponent, {
      data: { hospitalization: this.hospitalization.hospitalizationId },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogTA(): void {
    const dialogRef = this.dialog.open(TaModalComponent, {
      data: { hospitalization: this.hospitalization.hospitalizationId },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogAllTemp(): void {
    const dialogRef = this.dialog.open(AllTemperaturesComponent, {
      data: this.hospitalization.hospitalizationId,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogAllPulses(): void {
    const dialogRef = this.dialog.open(AllPulsesComponent, {
      data: this.hospitalization.hospitalizationId,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogAllBreaths(): void {
    const dialogRef = this.dialog.open(AllBreathsComponent, {
      data: this.hospitalization.hospitalizationId,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }

  openDialogAllTas(): void {
    const dialogRef = this.dialog.open(AllTasComponent, {
      data: this.hospitalization.hospitalizationId,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getDetails(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.details = data;
        });
    });
  }
}
