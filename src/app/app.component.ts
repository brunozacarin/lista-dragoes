import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User | undefined;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => {
      if (x && x.id) {
        this.user = x; console.log(this.user);
      } else {
        this.user = undefined;
      }
    });
  }

  logout() {
    this.accountService.logout();
  }
}
