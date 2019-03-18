import { Component, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'pw-cinema';
  constructor(private usersService: UsersService) {}


  ngOnDestroy(): void {
    if (this.usersService.user) {
      localStorage.setItem('connectedUsers', localStorage.getItem('connectedUsers') ? (parseInt(localStorage.getItem('connectedUsers')) - 1).toString() : '0');
    }
  }
}
