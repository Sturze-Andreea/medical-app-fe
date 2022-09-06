import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/data/services/notification.service';
import { TAService } from 'src/app/data/services/ta.service';

@Component({
  selector: 'app-ta-modal',
  templateUrl: './ta-modal.component.html',
  styleUrls: ['./ta-modal.component.scss']
})
export class TaModalComponent implements OnInit {
  taForm: FormGroup;
  today = (new Date()).toISOString().substring(0,10);
  constructor(
    public dialogRef: MatDialogRef<TaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private taService: TAService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.taForm = this.formBuilder.group({
      min: ['', [Validators.required, Validators.min(30), Validators.max(350)]],
      max: ['', [Validators.required, Validators.min(30), Validators.max(350)]],
      hospitalizationId: [this.data.hospitalization, []],
      date: [this.today, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.taService.formData = this.taForm.value;
    this.taService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }

}
