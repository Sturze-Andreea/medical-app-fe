import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pulse } from 'src/app/data/models/pulse.model';
import { PulseService } from 'src/app/data/services/pulse.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-all-pulses',
  templateUrl: './all-pulses.component.html',
  styleUrls: ['./all-pulses.component.scss']
})
export class AllPulsesComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-Pulse',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Pulse>();
  constructor(
    public dialogRef: MatDialogRef<AllPulsesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private pulseService: PulseService
  ) {}

  ngOnInit() {
    this.pulseService.getAllByHospitalization(this.data).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res as Pulse[]);
    });
  }

  close() {
    this.dialogRef.close();
  }

  openDialogDelete(pulse: any): void {
    const dialogRefDel = this.dialog.open(DeleteModalComponent, {
      data: `the pulse from ${pulse.date.substring(0,10)}`,
    });
    dialogRefDel.componentInstance.save.subscribe((res: any) => {
      this.pulseService.delete(pulse.pulseId).subscribe();
    });
    dialogRefDel.afterClosed().subscribe((data: any) => {
      this.pulseService.getAllByHospitalization(this.data).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Pulse[]);
      });
    });
  }
}
