import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { doc, docSnapshots, Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatNativeDateModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId: string = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') || '';
      this.getUser();
    })
  }

  getUser() {
    if (this.userId) {
      const userDoc = doc(this.firestore, `users/${this.userId}`);

      docSnapshots(userDoc).subscribe(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          this.user = new User(data);
        } else {
          console.error('User not found');
        }
      });
    }
  }

  editUser() {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.user;
  }

}
