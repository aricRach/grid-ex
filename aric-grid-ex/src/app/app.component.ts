import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { DataModel } from './models/data.model';
import { StatesModel } from './models/states.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  private count = 0;
  boxes : DataModel[];
  states: string[];

  constructor(private socket: Socket) {
    this.boxes = [];
    this.states =[];
  }

  ngOnInit(): void {
    this.startSocketStream();
    this.handleDisconnect();
    this.setStates();
  }

  private startSocketStream(): void {
    this.socket.emit('sendData', this.boxes);
    this.socket.on('request', (data: any) => {
      this.count++;
      if(this.count < 500) {
        for(let i in data) {
          const index = +i;
          this.boxes[index] = {id: index, state: StatesModel[data[index]], timeStamp: Date.now()} as DataModel
        }
      } else{
        this.socket.removeAllListeners();
      }
    });
  }

  private handleDisconnect(): void {
    this.socket.on('disconnect', () => {
      this.socket.removeAllListeners();
      this.socket.on('connect', () => {
        this.startSocketStream();
      });
    });
  }

  private setStates(): void {
    for (let enumMember in StatesModel) {
      let enumNumber = +enumMember;
      if (enumNumber >= 0) {
        this.states[enumNumber] = StatesModel[enumNumber];
      }
    }
  }

  ngOnDestroy(): void {
    this.socket.removeAllListeners();
  }
}
