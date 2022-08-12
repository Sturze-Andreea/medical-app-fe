import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnamnesisService } from 'src/app/data/services/anamnesis.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-anamnesis-modal',
  templateUrl: './anamnesis-modal.component.html',
  styleUrls: ['./anamnesis-modal.component.scss']
})
export class AnamnesisModalComponent implements OnInit {
  anamnesisForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AnamnesisModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private anamnesisService: AnamnesisService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    if (this.data.hospitalizationId) {
      this.anamnesisForm = this.formBuilder.group({
        anamnesisId: [this.data.anamnesisId, [Validators.required]],
        hospitalizationId: [this.data.hospitalizationId, [Validators.required]],
        colateralAntecedents: [this.data.colateralAntecedents, [Validators.required]],
        lifeWorkConditions: [this.data.lifeWorkConditions, [Validators.required]],
        behaviour: [this.data.behaviour, [Validators.required]],
        personalAntecedents: [this.data.personalAntecedents, [Validators.required]],
        beforeMedication: [this.data.beforeMedication, [Validators.required]],
        diseaseHistory: [this.data.diseaseHistory, [Validators.required]],
      });
    } else {
      this.anamnesisForm = this.formBuilder.group({
        anamnesisId: [0, []],
        hospitalizationId: [this.data.hospitalization, [Validators.required]],
        colateralAntecedents: ['', [Validators.required]],
        lifeWorkConditions: ['', [Validators.required]],
        behaviour: ['', [Validators.required]],
        personalAntecedents: ['', [Validators.required]],
        beforeMedication: ['', [Validators.required]],
        diseaseHistory: ['', [Validators.required]],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.data.hospitalizationId) {
      this.anamnesisService.formData = this.anamnesisForm.value;
      this.anamnesisService.edit().subscribe((data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      })
    } else {
      this.anamnesisService.formData = this.anamnesisForm.value;
      this.anamnesisService.add().subscribe((data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      })
    }
  }
}
