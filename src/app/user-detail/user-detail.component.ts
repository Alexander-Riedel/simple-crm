import { Component } from '@angular/core';
import { doc, docSnapshots, Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId: string = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

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

  openAddressDialog() {

  }

}
