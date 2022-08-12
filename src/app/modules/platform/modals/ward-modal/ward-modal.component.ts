import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/data/services/notification.service';
import { WardService } from 'src/app/data/services/ward.service';

@Component({
  selector: 'app-ward-modal',
  templateUrl: './ward-modal.component.html',
  styleUrls: ['./ward-modal.component.scss'],
})
export class WardModalComponent implements OnInit {
  wardForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<WardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public service: WardService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.wardForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]],
      });
    } else {
      this.wardForm = this.formBuilder.group({
        name: ['', [Validators.required]],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.data) {
      this.service.formData.name = this.wardForm.controls.name.value;
      this.service.edit().subscribe(
        (data: any) => {
          this.close();
        },
        (err: any) => {
          this.notifyService.showError(err, '');
        }
      );
    } else {
      this.service.formData.name = this.wardForm.controls.name.value;
      this.service.add().subscribe(
        (data: any) => {
          this.close();
        },
        (err: any) => {
          this.notifyService.showError(err, '');
        }
      );
    }
  }
}
