import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) {}

  getNumberOfUsers() {
    return this.socket.fromEvent('noUsers');
  }
}
