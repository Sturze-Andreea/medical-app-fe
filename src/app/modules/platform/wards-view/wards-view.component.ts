import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ward } from 'src/app/data/models/ward.model';
import { TokenStorageService } from 'src/app/data/services/token-storage.service';
import { WardService } from 'src/app/data/services/ward.service';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { WardModalComponent } from '../modals/ward-modal/ward-modal.component';

@Component({
  selector: 'app-wards-view',
  templateUrl: './wards-view.component.html',
  styleUrls: ['./wards-view.component.scss'],
})
export class WardsViewComponent implements OnInit {
  role: string = '';
  constructor(
    public service: WardService,
    public dialog: MatDialog,
    private tokenService: TokenStorageService
  ) {
    this.role = this.tokenService.getRole();
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  delete(wardId: number) {
    this.service.delete(wardId).subscribe((res) => {
      this.service.refreshList();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WardModalComponent, {
      data: undefined,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.service.refreshList();
    });
  }

  openDialogEdit(ward: any): void {
    this.service.formData.wardId = ward.wardId;
    const dialogRef = this.dialog.open(WardModalComponent, {
      data: ward,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.service.refreshList();
    });
  }

  openDialogDelete(ward: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: `the ward ${ward.name}`,
    });
    dialogRef.componentInstance.save.subscribe((res: any) => {
      this.delete(ward.wardId);
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.service.refreshList();
    });
  }
}
