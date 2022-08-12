import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Temperature } from 'src/app/data/models/temperature.model';
import { TemperatureService } from 'src/app/data/services/temperature.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-all-temperatures',
  templateUrl: './all-temperatures.component.html',
  styleUrls: ['./all-temperatures.component.scss'],
})
export class AllTemperaturesComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-Temperature',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Temperature>();
  constructor(
    public dialogRef: MatDialogRef<AllTemperaturesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private tempService: TemperatureService
  ) {}

  ngOnInit() {
    this.tempService.getAllByHospitalization(this.data).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res as Temperature[]);
    });
  }

  close() {
    this.dialogRef.close();
  }

  openDialogDelete(temp: any): void {
    const dialogRefDel = this.dialog.open(DeleteModalComponent, {
      data: `the temperature from ${temp.date.substring(0,10)}`,
    });
    dialogRefDel.componentInstance.save.subscribe((res: any) => {
      this.tempService.delete(temp.temperatureId).subscribe();
    });
    dialogRefDel.afterClosed().subscribe((data: any) => {
      this.tempService.getAllByHospitalization(this.data).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Temperature[]);
      });
    });
  }
}
