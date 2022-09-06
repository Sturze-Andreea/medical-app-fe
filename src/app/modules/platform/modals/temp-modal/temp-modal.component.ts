import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/data/services/notification.service';
import { TemperatureService } from 'src/app/data/services/temperature.service';

@Component({
  selector: 'app-temp-modal',
  templateUrl: './temp-modal.component.html',
  styleUrls: ['./temp-modal.component.scss'],
})
export class TempModalComponent implements OnInit {
  tempForm: FormGroup;
  today = (new Date()).toISOString().substring(0,10);
  constructor(
    public dialogRef: MatDialogRef<TempModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private tempService: TemperatureService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.tempForm = this.formBuilder.group({
      temp: ['', [Validators.required, Validators.min(35), Validators.max(42)]],
      hospitalizationId: [this.data.hospitalization, []],
      date: [this.today, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.tempService.formData = this.tempForm.value;
    this.tempService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }
}
