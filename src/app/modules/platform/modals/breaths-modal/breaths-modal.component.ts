import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreathService } from 'src/app/data/services/breath.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-breaths-modal',
  templateUrl: './breaths-modal.component.html',
  styleUrls: ['./breaths-modal.component.scss']
})
export class BreathModalComponent implements OnInit {
  breathForm: FormGroup;
  today = (new Date()).toISOString().substring(0,10);
  constructor(
    public dialogRef: MatDialogRef<BreathModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private breathService: BreathService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.breathForm = this.formBuilder.group({
      breathNr: ['', [Validators.required, Validators.min(5), Validators.max(40)]],
      hospitalizationId: [this.data.hospitalization, []],
      date: [this.today, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.breathService.formData = this.breathForm.value;
    this.breathService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }
}
