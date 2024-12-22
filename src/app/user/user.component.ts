import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTableModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'street', 'zipCode', 'city'];

  constructor(public dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection).subscribe((changes: any[]) => {
      console.log('Received changes from DB', changes);
      this.dataSource.data = changes;
    });
  }

  openDialog() {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    this.dialog.open(DialogAddUserComponent);
  }
}
