import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Evolution } from 'src/app/data/models/evolution.model';
import { EvolutionService } from 'src/app/data/services/evolution.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-all-evolutions',
  templateUrl: './all-evolutions.component.html',
  styleUrls: ['./all-evolutions.component.scss']
})
export class AllEvolutionsComponent implements OnInit {
  displayedColumns: string[] = [
    'demo-Evolution',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Evolution>();
  constructor(
    public dialogRef: MatDialogRef<AllEvolutionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private evolutionService: EvolutionService
  ) {}

  ngOnInit() {
    this.evolutionService.getAllByHospitalization(this.data).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res as Evolution[]);
    });
  }

  close() {
    this.dialogRef.close();
  }

  openDialogDelete(evolution: any): void {
    const dialogRefDel = this.dialog.open(DeleteModalComponent, {
      data: `the evolution from ${evolution.date.substring(0,10)}`,
    });
    dialogRefDel.componentInstance.save.subscribe((res: any) => {
      this.evolutionService.delete(evolution.evolutionId).subscribe();
    });
    dialogRefDel.afterClosed().subscribe((data: any) => {
      this.evolutionService.getAllByHospitalization(this.data).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Evolution[]);
      });
    });
  }
}
