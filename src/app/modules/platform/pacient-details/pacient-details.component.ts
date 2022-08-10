import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientService } from 'src/app/data/services/pacient.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { Hospitalization } from 'src/app/data/models/hospitalization.model';

@Component({
  selector: 'app-pacient-details',
  templateUrl: './pacient-details.component.html',
  styleUrls: ['./pacient-details.component.scss'],
})
export class PacientDetailsComponent implements OnInit {
  hospitalization: Hospitalization = new Hospitalization();
  patient: Pacient = new Pacient();
  age: number = 0;

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
      this.pacientService.getById(this.hospitalization.patientId).subscribe((res) => {
        this.patient = res as Pacient;
        this.age = this.getAge(this.patient.dob);
      });

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
}
