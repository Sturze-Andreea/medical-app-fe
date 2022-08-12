import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrugService } from 'src/app/data/services/drug.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-drug-modal',
  templateUrl: './drug-modal.component.html',
  styleUrls: ['./drug-modal.component.scss']
})
export class DrugModalComponent implements OnInit {
  drugForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DrugModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private drugService: DrugService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.drugForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      frequency: ['', [Validators.required]],
      administerWay: ['', [Validators.required]],
      hospitalizationId: [this.data.hospitalization, []],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.drugService.formData = this.drugForm.value;
    this.drugService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }

}
