import { Component, OnInit } from '@angular/core';
import { Ward } from 'src/app/data/models/ward.model';
import { WardService } from 'src/app/data/services/ward.service';

@Component({
  selector: 'app-wards-view',
  templateUrl: './wards-view.component.html',
  styleUrls: ['./wards-view.component.scss'],
})
export class WardsViewComponent implements OnInit {
  name: string = '';
  constructor(public service: WardService) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  add() {
    this.service.formData = new Ward();
    this.service.formData.name = this.name;
    this.service.add().subscribe((res) => {
      this.service.refreshList();
    });
    this.name = '';
  }

  delete(wardId: number) {
    this.service.delete(wardId).subscribe((res) => {
      this.service.refreshList();
    });
  }

  edit(ward: Ward) {
    this.service.formData.wardId = ward.wardId;
    this.name = ward.name;
  }
  editToServ() {
    this.service.formData.name = this.name;
    this.service.edit().subscribe((res) => {
      this.service.refreshList();
    });
    this.name = '';
  }
}
