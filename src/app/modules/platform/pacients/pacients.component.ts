import { Component, OnInit } from '@angular/core';
import { Pacient } from 'src/app/data/models/pacient.model';

const ELEMENT_DATA: Pacient[] = [
  {PacientId: 1, Name: 'Pop Ion'},
  {PacientId: 2, Name: 'Pop Ion'},
  {PacientId: 3, Name: 'Pop Ion'},
  {PacientId: 4, Name: 'Pop Ion'},
  {PacientId: 5, Name: 'Pop Ion'},
  {PacientId: 6, Name: 'Pop Ion'},
  {PacientId: 7, Name: 'Pop Ion'},
  {PacientId: 8, Name: 'Pop Ion'},
  {PacientId: 9, Name: 'Pop Ion'},
  {PacientId: 10, Name: 'Pop Ion'},
];
@Component({
  selector: 'app-pacients',
  templateUrl: './pacients.component.html',
  styleUrls: ['./pacients.component.scss']
})
export class PacientsComponent implements OnInit {
  displayedColumns: string[] = ['demo-PacientId', 'demo-Name', 'demo-Actions'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
