import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiquidsService } from 'src/app/data/services/liquids.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-others-modal',
  templateUrl: './others-modal.component.html',
  styleUrls: ['./others-modal.component.scss']
})
export class OthersModalComponent implements OnInit {
  liquidsForm: FormGroup;
  today = (new Date()).toISOString().substring(0,10);
  constructor(
    public dialogRef: MatDialogRef<OthersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private liquidsService: LiquidsService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.liquidsForm = this.formBuilder.group({
      vomiting: ['', [Validators.required]],
      diuresis: ['', [Validators.required]],
      discharge: ['', [Validators.required]],
      hospitalizationId: [this.data.hospitalization, []],
      date: [this.today, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.liquidsService.formData = this.liquidsForm.value;
    this.liquidsService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }
}
