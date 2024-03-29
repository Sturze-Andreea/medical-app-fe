import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientService } from 'src/app/data/services/pacient.service';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { PacientModalComponent } from '../modals/pacient-modal/pacient-modal.component';

@Component({
  selector: 'app-all-pacients-view',
  templateUrl: './all-pacients-view.component.html',
  styleUrls: ['./all-pacients-view.component.scss'],
})
export class AllPacientsViewComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-Cnp',
    'demo-LastName',
    'demo-FirstName',
    'demo-Dob',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Pacient>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private pacientService: PacientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pacientService.refreshList().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res as Pacient[]);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number): void {
    this.pacientService.delete(id).subscribe((res) => {
      this.pacientService.refreshList().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Pacient[]);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PacientModalComponent, {
      data: undefined,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.pacientService.refreshList().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data as Pacient[]);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openDialogEdit(pacient: any): void {
    const dialogRef = this.dialog.open(PacientModalComponent, {
      data: pacient,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.pacientService.refreshList().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data as Pacient[]);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openDialogDelete(pacient: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: `the pacient ${pacient.lastName} ${pacient.firstName}`,
    });
    dialogRef.componentInstance.save.subscribe((res: any) => {
      this.delete(pacient.patientId);
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.pacientService.refreshList().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data as Pacient[]);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
