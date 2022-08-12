import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientFromWard } from 'src/app/data/models/pacientFromWard.model';
import { Ward } from 'src/app/data/models/ward.model';
import { AuthService } from 'src/app/data/services/auth.service';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { PacientService } from 'src/app/data/services/pacient.service';
import { WardService } from 'src/app/data/services/ward.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { HospitalizationModalComponent } from '../hospitalization-modal/hospitalization-modal.component';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.scss'],
})
export class PacientsComponent implements OnInit {
  wardId: number = -1;
  ward: Ward = new Ward();
  displayedColumns: string[] = [
    'demo-Pacient',
    'demo-Date',
    'demo-RoomNr',
    'demo-BedNr',
    'demo-Doctor',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<PacientFromWard>();
  doctors: any[] = [];
  constructor(
    private pacientService: PacientService,
    private hospitalizationService: HospitalizationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private wardService: WardService,
    private authService: AuthService
  ) {
    this.wardId = this.route.snapshot.params.wardId;
    this.wardService.getById(this.wardId).subscribe((data: any) => {
      this.ward = data;
    });
  }

  ngOnInit(): void {
    this.authService.getDoctors().subscribe((data: any) => {
      this.doctors = data;
    });
    this.pacientService
      .refreshListFromWard(this.wardId)
      .subscribe((res: any) => {
        res.map((element: any) => {
          const doctorId = element.doctor;
          const doctor = this.doctors.find(
            (doc: any) => doc.userId === doctorId
          );
          element.doctor = `${doctor.lastName} ${doctor.firstName}`;
          return element;
        });
        this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDelete(hospitalization: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: `the hospitalization for ${hospitalization.lastName} ${
        hospitalization.firstName
      } from ${hospitalization.hospitalizationDate.substring(0, 10)}`,
    });
    dialogRef.componentInstance.save.subscribe((res: any) => {
      this.delete(hospitalization.hospitalizationId);
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.pacientService
      .refreshListFromWard(this.wardId)
      .subscribe((res: any) => {
        res.map((element: any) => {
          const doctorId = element.doctor;
          const doctor = this.doctors.find(
            (doc: any) => doc.userId === doctorId
          );
          element.doctor = `${doctor.lastName} ${doctor.firstName}`;
          return element;
        });
        this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
      });
    });
  }

  delete(id: number): void {
    this.hospitalizationService.delete(id).subscribe((res) => {
      this.pacientService
      .refreshListFromWard(this.wardId)
      .subscribe((res: any) => {
        res.map((element: any) => {
          const doctorId = element.doctor;
          const doctor = this.doctors.find(
            (doc: any) => doc.userId === doctorId
          );
          element.doctor = `${doctor.lastName} ${doctor.firstName}`;
          return element;
        });
        this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HospitalizationModalComponent, {
      data: {
        ward: Number(this.wardId),
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.pacientService
      .refreshListFromWard(this.wardId)
      .subscribe((res: any) => {
        res.map((element: any) => {
          const doctorId = element.doctor;
          const doctor = this.doctors.find(
            (doc: any) => doc.userId === doctorId
          );
          element.doctor = `${doctor.lastName} ${doctor.firstName}`;
          return element;
        });
        this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
      });
    });
  }

  openDialogEdit(hospitalizationId: any): void {
    this.hospitalizationService
      .getById(hospitalizationId)
      .subscribe((data: any) => {
        const dialogRef = this.dialog.open(HospitalizationModalComponent, {
          data: data,
        });
        dialogRef.afterClosed().subscribe((data: any) => {
          this.pacientService
          .refreshListFromWard(this.wardId)
          .subscribe((res: any) => {
            res.map((element: any) => {
              const doctorId = element.doctor;
              const doctor = this.doctors.find(
                (doc: any) => doc.userId === doctorId
              );
              element.doctor = `${doctor.lastName} ${doctor.firstName}`;
              return element;
            });
            this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
          });
        });
      });
  }
}
