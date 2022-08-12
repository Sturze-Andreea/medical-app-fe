import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Breath } from 'src/app/data/models/breath.model';
import { BreathService } from 'src/app/data/services/breath.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-all-breaths',
  templateUrl: './all-breaths.component.html',
  styleUrls: ['./all-breaths.component.scss']
})
export class AllBreathsComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-Breath',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Breath>();
  constructor(
    public dialogRef: MatDialogRef<AllBreathsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private breathService: BreathService
  ) {}

  ngOnInit() {
    this.breathService.getAllByHospitalization(this.data).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res as Breath[]);
    });
  }

  close() {
    this.dialogRef.close();
  }

  openDialogDelete(breath: any): void {
    const dialogRefDel = this.dialog.open(DeleteModalComponent, {
      data: `the breath from ${breath.date.substring(0,10)}`,
    });
    dialogRefDel.componentInstance.save.subscribe((res: any) => {
      this.breathService.delete(breath.breathId).subscribe();
    });
    dialogRefDel.afterClosed().subscribe((data: any) => {
      this.breathService.getAllByHospitalization(this.data).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Breath[]);
      });
    });
  }

}
