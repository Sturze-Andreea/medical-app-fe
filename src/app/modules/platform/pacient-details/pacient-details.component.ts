import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientService } from 'src/app/data/services/pacient.service';
import { MatDialog } from '@angular/material/dialog';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { Hospitalization } from 'src/app/data/models/hospitalization.model';
import { PacientDetails } from 'src/app/data/models/pacientDetails.model';
import { TempModalComponent } from '../modals/temp-modal/temp-modal.component';
import { PulseModalComponent } from '../modals/pulse-modal/pulse-modal.component';
import { BreathModalComponent } from '../modals/breaths-modal/breaths-modal.component';
import { TaModalComponent } from '../modals/ta-modal/ta-modal.component';
import { EvolutionModalComponent } from '../modals/evolution-modal/evolution-modal.component';
import { OthersModalComponent } from '../modals/others-modal/others-modal.component';
import { AllTemperaturesComponent } from '../modals/all-temperatures/all-temperatures.component';
import { AllPulsesComponent } from '../modals/all-pulses/all-pulses.component';
import { AllBreathsComponent } from '../modals/all-breaths/all-breaths.component';
import { AllTasComponent } from '../modals/all-tas/all-tas.component';
import { AllEvolutionsComponent } from '../modals/all-evolutions/all-evolutions.component';
import { AllOthersComponent } from '../modals/all-others/all-others.component';
import { DrugService } from 'src/app/data/services/drug.service';
import { Drug } from 'src/app/data/models/drug.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { DrugModalComponent } from '../modals/drug-modal/drug-modal.component';
import { ChartComponent } from '../chart/chart.component';
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
  drugs: Drug[] = [];
  dataSource = new MatTableDataSource<Drug>();
  displayedColumns: string[] = [
    'name',
    'frequency',
    'administerWay',
    'actions',
  ];

  constructor(
    private pacientService: PacientService,
    private hospitalizationService: HospitalizationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private drugService: DrugService
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
    this.drugService.getAllByHospitalization(id).subscribe((data: any) => {
      this.drugs = data;
      this.dataSource = new MatTableDataSource(data as Drug[]);
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

  openDialogEvolution(): void {
    const dialogRef = this.dialog.open(EvolutionModalComponent, {
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

  openDialogOthers(): void {
    const dialogRef = this.dialog.open(OthersModalComponent, {
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

  openDialogDrug(): void {
    const dialogRef = this.dialog.open(DrugModalComponent, {
      data: { hospitalization: this.hospitalization.hospitalizationId },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.drugService
        .getAllByHospitalization(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.drugs = data;
          this.dataSource = new MatTableDataSource(data as Drug[]);
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

  openDialogAllEvolutions(): void {
    const dialogRef = this.dialog.open(AllEvolutionsComponent, {
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

  openDialogAllOthers(): void {
    const dialogRef = this.dialog.open(AllOthersComponent, {
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

  openDialogDelete(drug: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: `the drug ${drug.name} from this plan`,
    });
    dialogRef.componentInstance.save.subscribe((res: any) => {
      this.drugService.delete(drug.drugId).subscribe();
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.drugService
        .getAllByHospitalization(this.hospitalization.hospitalizationId)
        .subscribe((data: any) => {
          this.drugs = data;
          this.dataSource = new MatTableDataSource(data as Drug[]);
        });
    });
  }

  openChart(): void {
    const dialogRef = this.dialog.open(ChartComponent, {
      data: {id: this.hospitalization.hospitalizationId, pacient: `${this.patient.lastName} ${this.patient.firstName}`}
    });
  }
}
