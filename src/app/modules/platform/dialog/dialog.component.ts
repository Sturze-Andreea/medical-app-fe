import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pacient } from 'src/app/data/models/pacient.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pacient,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close();
  }
  
  

 
}
