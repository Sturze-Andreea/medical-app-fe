import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvolutionService } from 'src/app/data/services/evolution.service';
import { NotificationService } from 'src/app/data/services/notification.service';

@Component({
  selector: 'app-evolution-modal',
  templateUrl: './evolution-modal.component.html',
  styleUrls: ['./evolution-modal.component.scss']
})
export class EvolutionModalComponent implements OnInit {
  evolutionForm: FormGroup;
  today = (new Date()).toISOString().substring(0,10);
  constructor(
    public dialogRef: MatDialogRef<EvolutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private evolutionService: EvolutionService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.evolutionForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      hospitalizationId: [this.data.hospitalization, []],
      date: [this.today, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.evolutionService.formData = this.evolutionForm.value;
    this.evolutionService.add().subscribe(
      (data: any) => {
        this.close();
      },
      (err: any) => {
        this.notifyService.showError(err, '');
      }
    );
  }

}
