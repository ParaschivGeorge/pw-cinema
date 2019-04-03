import { Component, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';
import { SocketIoService } from './services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pw-cinema';
  constructor(private usersService: UsersService,
     private socketIoService: SocketIoService
    ) { }
}
