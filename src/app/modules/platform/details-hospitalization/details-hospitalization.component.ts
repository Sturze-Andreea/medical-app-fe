import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Anamnesis } from 'src/app/data/models/anamnesis.model';
import { ClinicalExamination } from 'src/app/data/models/clinicalExamination.model';
import { Hospitalization } from 'src/app/data/models/hospitalization.model';
import { AnamnesisService } from 'src/app/data/services/anamnesis.service';
import { AuthService } from 'src/app/data/services/auth.service';
import { ClinicalExaminationService } from 'src/app/data/services/clinicalExamination.service';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { WardService } from 'src/app/data/services/ward.service';
import { AnamnesisModalComponent } from '../modals/anamnesis-modal/anamnesis-modal.component';
import { ClinicalExaminationModalComponent } from '../modals/clinical-examination-modal/clinical-examination-modal.component';
import { HospitalizationModalComponent } from '../modals/hospitalization-modal/hospitalization-modal.component';

@Component({
  selector: 'app-details-hospitalization',
  templateUrl: './details-hospitalization.component.html',
  styleUrls: ['./details-hospitalization.component.scss'],
})
export class DetailsHospitalizationComponent implements OnInit {
  @Input() hospitalization: any = null;
  @Input() patient: any = null;
  doctor: any = { firstName: '', lastName: '' };
  ward: any = { name: '' };
  anamnesis: Anamnesis = new Anamnesis();
  clinicalExamination: ClinicalExamination = new ClinicalExamination();
  constructor(
    private authService: AuthService,
    private wardService: WardService,
    private hospitalizationService: HospitalizationService,
    private anamnesisService: AnamnesisService,
    private clinicalExaminationService: ClinicalExaminationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.hospitalization.hospitalizationId) {
      this.authService
        .getById(this.hospitalization.doctor)
        .subscribe((data: any) => {
          this.doctor = data;
        });
      this.wardService
        .getById(this.hospitalization.wardId)
        .subscribe((data: any) => {
          this.ward = data;
        });
      this.anamnesisService
        .getByHospitalizationId(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.anamnesis = data;
        });
      this.clinicalExaminationService
        .getByHospitalizationId(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.clinicalExamination = data;
        });
    }
  }

  openDialogHospitalization(): void {
    const dialogRef = this.dialog.open(HospitalizationModalComponent, {
      data: this.hospitalization,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.hospitalizationService
        .getById(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.hospitalization = data;
        });
    });
  }

  openDialogAnamnesis(anamnesis?: any): void {
    const dialogRef = this.dialog.open(AnamnesisModalComponent, {
      data: anamnesis
        ? anamnesis
        : { hospitalization: this.hospitalization.hospitalizationId },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.anamnesisService
        .getByHospitalizationId(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.anamnesis = data;
        });
    });
  }

  openDialogClinicalExamination(examination?: any): void {
    const dialogRef = this.dialog.open(ClinicalExaminationModalComponent, {
      data: examination
      ? examination
      : { hospitalization: this.hospitalization.hospitalizationId },
  });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.clinicalExaminationService
        .getByHospitalizationId(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.clinicalExamination = data;
        });
    });
  }
}
