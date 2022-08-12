import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Liquids } from 'src/app/data/models/liquids.model';
import { LiquidsService } from 'src/app/data/services/liquids.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-all-others',
  templateUrl: './all-others.component.html',
  styleUrls: ['./all-others.component.scss']
})
export class AllOthersComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-Vomiting',
    'demo-Diuresis',
    'demo-Discharge',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Liquids>();
  constructor(
    public dialogRef: MatDialogRef<AllOthersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private liquidsService: LiquidsService
  ) {}

  ngOnInit() {
    this.liquidsService.getAllByHospitalization(this.data).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res as Liquids[]);
    });
  }

  close() {
    this.dialogRef.close();
  }

  openDialogDelete(liquids: any): void {
    const dialogRefDel = this.dialog.open(DeleteModalComponent, {
      data: `the liquids from ${liquids.date.substring(0,10)}`,
    });
    dialogRefDel.componentInstance.save.subscribe((res: any) => {
      this.liquidsService.delete(liquids.liquidsId).subscribe();
    });
    dialogRefDel.afterClosed().subscribe((data: any) => {
      this.liquidsService.getAllByHospitalization(this.data).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Liquids[]);
      });
    });
  }

}
