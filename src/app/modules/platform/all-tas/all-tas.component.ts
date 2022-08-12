import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TA } from 'src/app/data/models/ta.model';
import { TAService } from 'src/app/data/services/ta.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-all-tas',
  templateUrl: './all-tas.component.html',
  styleUrls: ['./all-tas.component.scss']
})
export class AllTasComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-TA',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<TA>();
  constructor(
    public dialogRef: MatDialogRef<AllTasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private taService: TAService
  ) {}

  ngOnInit() {
    this.taService.getAllByHospitalization(this.data).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res as TA[]);
    });
  }

  close() {
    this.dialogRef.close();
  }

  openDialogDelete(ta: any): void {
    const dialogRefDel = this.dialog.open(DeleteModalComponent, {
      data: `the blood pressure from ${ta.date.substring(0,10)}`,
    });
    dialogRefDel.componentInstance.save.subscribe((res: any) => {
      this.taService.delete(ta.taId).subscribe();
    });
    dialogRefDel.afterClosed().subscribe((data: any) => {
      this.taService.getAllByHospitalization(this.data).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as TA[]);
      });
    });
  }
}
