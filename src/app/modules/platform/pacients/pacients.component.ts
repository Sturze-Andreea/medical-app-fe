import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientFromWard } from 'src/app/data/models/pacientFromWard.model';
import { HospitalizationService } from 'src/app/data/services/hospitalization.service';
import { PacientService } from 'src/app/data/services/pacient.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.scss'],
})
export class PacientsComponent implements OnInit {
  wardId: number = -1;
  displayedColumns: string[] = [
    'demo-PacientId',
    'demo-LastName',
    'demo-FirstName',
    'demo-Date',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<PacientFromWard>();
  constructor(
    private pacientService: PacientService,
    private hospitalizationService: HospitalizationService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.wardId = this.route.snapshot.params.wardId;
  }

  ngOnInit(): void {
    this.pacientService.refreshListFromWard(this.wardId).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(): void {
    // this.pacientService.formData = new Pacient();
    // ///inputuri
    // this.pacientService.formData.firstName = 'AAAA';
    // this.pacientService.formData.lastName = 'BBBBBB';
    // this.pacientService.formData.dob = new Date('1970/02/05');
    // this.pacientService.add().subscribe((res: any) => {
    //   this.hospitalizationService.formData.patientId = res.patientId;
    //   this.hospitalizationService.formData.wardId = this.wardId;
    //   this.hospitalizationService.formData.discharged = true;
    //   this.hospitalizationService.add().subscribe((res: any) => {
    //     this.pacientService
    //       .refreshListFromWard(this.wardId)
    //       .subscribe((res) => {
    //         this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
    //       });
    //   });
    // });
  }

  openDialogDelete(hospitalization: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: `the hospitalization for ${hospitalization.lastName} ${hospitalization.firstName} from ${hospitalization.hospitalizationDate.substring(0,10)}`,
    });
    dialogRef.componentInstance.save.subscribe((res: any) => {
      this.delete(hospitalization.hospitalizationId);
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.pacientService.refreshListFromWard(this.wardId).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
      });
    });
  }

  delete(id: number): void {
    this.hospitalizationService.delete(id).subscribe((res) => {
      this.pacientService.refreshListFromWard(this.wardId).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as PacientFromWard[]);
      });
    });
  }
}
