import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClinicalExaminationService } from 'src/app/data/services/clinicalExamination.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-clinical-examination-modal',
  templateUrl: './clinical-examination-modal.component.html',
  styleUrls: ['./clinical-examination-modal.component.scss']
})
export class ClinicalExaminationModalComponent implements OnInit {
  clinicalExaminationForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ClinicalExaminationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private clinicalExaminationService: ClinicalExaminationService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    if (this.data.hospitalizationId) {
      this.clinicalExaminationForm = this.formBuilder.group({
        clinicalExaminationId: [this.data.clinicalExaminationId, [Validators.required]],
        hospitalizationId: [this.data.hospitalizationId, [Validators.required]],
        generalCondition: [this.data.generalCondition, [Validators.required]],
        height: [this.data.height, [Validators.required]],
        behaviour: [this.data.behaviour, [Validators.required]],
        weight: [this.data.weight, [Validators.required]],
        nutrition: [this.data.nutrition, [Validators.required]],
        consciousness: [this.data.consciousness, [Validators.required]],
        respiratorySystem: [this.data.respiratorySystem, [Validators.required]],
        circulatorySystem: [this.data.circulatorySystem, [Validators.required]],
        digestiveTract: [this.data.digestiveTract, [Validators.required]],
      });
    } else {
      this.clinicalExaminationForm = this.formBuilder.group({
        clinicalExaminationId: [0, []],
        hospitalizationId: [this.data.hospitalization, [Validators.required]],
        generalCondition: ['', [Validators.required]],
        height: ['', [Validators.required]],
        behaviour: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        nutrition: ['', [Validators.required]],
        consciousness: ['', [Validators.required]],
        respiratorySystem: ['', [Validators.required]],
        circulatorySystem: ['', [Validators.required]],
        digestiveTract: ['', [Validators.required]],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.data.hospitalizationId) {
      this.clinicalExaminationService.formData = this.clinicalExaminationForm.value;
      this.clinicalExaminationService.edit().subscribe((data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      })
    } else {
      this.clinicalExaminationService.formData = this.clinicalExaminationForm.value;
      this.clinicalExaminationService.add().subscribe((data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      })
    }
  }
}
