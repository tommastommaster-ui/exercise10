import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-list',
  imports: [CommonModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})

export class MessageList {
  messages = [
    { sender: 'Alice', content: 'Hello there!', isMe: true },
    { sender: 'Bob', content: 'Welcome to the messenger app!', isMe: false }
  ];
}