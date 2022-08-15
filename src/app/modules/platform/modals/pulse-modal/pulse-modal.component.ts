import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/data/services/notification.service';
import { PulseService } from 'src/app/data/services/pulse.service';

@Component({
  selector: 'app-pulse-modal',
  templateUrl: './pulse-modal.component.html',
  styleUrls: ['./pulse-modal.component.scss']
})
export class PulseModalComponent implements OnInit {
  pulseForm: FormGroup;
  today = (new Date()).toISOString().substring(0,10);
  constructor(
    public dialogRef: MatDialogRef<PulseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private pulseService: PulseService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.pulseForm = this.formBuilder.group({
      puls: ['', [Validators.required, Validators.min(30), Validators.max(130)]],
      hospitalizationId: [this.data.hospitalization, []],
      date: [this.today, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.pulseService.formData = this.pulseForm.value;
    this.pulseService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }
}
