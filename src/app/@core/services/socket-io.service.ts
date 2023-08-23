import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { ApiService } from 'src/app/@api/api.service';
import { environment } from 'src/environments/environment';
const beUrl = 'http://localhost:3000';

export interface User {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  clientSocketIt: socketIo.Socket;
  constructor() {
    this.clientSocketIt = socketIo.connect(beUrl, {
      transports: ['websocket'],
    });
  }

  lisonToServer(connection: string): Observable<any> {
    return new Observable((sub) => {
      this.clientSocketIt.on(connection, (data) => {
        sub.next(data);
      });
    });
  }

  emitToServer(connection: string): void {
    this.clientSocketIt.emit(connection);
  }
}
