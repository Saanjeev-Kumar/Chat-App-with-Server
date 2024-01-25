import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatappService } from 'src/app/services/chatapp.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewInit {

  bool: boolean = true
  username = localStorage.getItem("username")
  room: string = ""
  messageText: string = ""
  messageArray: Array<{ user: String, message: String }> = [];

  constructor(private _chatService: ChatappService) {

  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }



  join() {
    this.bool = true
    this._chatService.joinRoom({ user: this.username, room: this.room });
  }

  leave() {
    this._chatService.leaveRoom({ user: this.username, room: this.room });
    this.messageArray = []
    this.bool = false
  }

  sendMessage() {

    this._chatService.sendMessage({ user: this.username, room: this.room, message: this.messageText });
    this.messageText = ""

  }

  }
