import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/data/services/auth.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
})
export class UsersViewComponent implements OnInit {
  users: any[] = [];
  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.getAll().subscribe((data: any) => {
      this.users = data;
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: undefined,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.authService.getAll().subscribe((data: any) => {
        this.users = data;
      });
    });
  }

  delete(id: number): void {
    this.authService.delete(id).subscribe((data: any) => {
      const index = this.users.findIndex((user: any) => user.userId === id);
      this.users.splice(index, 1);
    });
  }
  openDialogEdit(user: any): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.authService.getAll().subscribe((data: any) => {
        this.users = data;
      });
    });
  }

  openDialogDelete(user: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: `the user ${user.lastName} ${user.firstName}`,
    });
    dialogRef.componentInstance.save.subscribe((res: any) => {
      this.delete(user.userId);
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      this.authService.getAll().subscribe((data: any) => {
        this.users = data;
      });
    });
  }
}
