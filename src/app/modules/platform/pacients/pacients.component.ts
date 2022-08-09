import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Pacient } from 'src/app/data/models/pacient.model';
import { PacientService } from 'src/app/data/services/pacient.service';

@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.scss'],
})
export class PacientsComponent implements OnInit {
  wardId :number = -1;
  displayedColumns: string[] = [
    'demo-PacientId',
    'demo-LastName',
    'demo-FirstName',
    'demo-Actions',
  ];
  dataSource = new MatTableDataSource<Pacient>();
  constructor(private pacientService: PacientService,
    private route: ActivatedRoute,) {
    this.wardId = this.route.snapshot.params.wardId;
  }

  ngOnInit(): void {
    this.pacientService.refreshListFromWard(this.wardId).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res as Pacient[]);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add(): void {
    this.pacientService.formData = new Pacient();
    ///inputuri
    this.pacientService.formData.firstName = 'AAAA';
    this.pacientService.formData.lastName = 'BBBBBB';
    this.pacientService.formData.dob = new Date("1970/02/05")
    this.pacientService.add().subscribe((res) => {
      this.pacientService.refreshListFromWard(this.wardId).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Pacient[]);
      });
    });
  }

  delete(id: number):void{
    this.pacientService.delete(id).subscribe((res) => {
      this.pacientService.refreshListFromWard(this.wardId).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res as Pacient[]);
      });
    });
  }
}
