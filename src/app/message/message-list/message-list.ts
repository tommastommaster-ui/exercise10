import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { LoginApi } from '../../api.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-message-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})


export class MessageList {

  readonly messages = signal<any[]>([]);
  readonly isLoading = signal(false);
  readonly errorMes = signal('');

  readonly contacts = signal<any[]>([]);
  receiverId: string | null = null;
  newMessage = '';
  //hardcoded
  //receiverId = '1344';

  loginApi = inject(LoginApi);

  ngOnInit(): void {
    const token = this.loginApi.token();
    const userId = this.loginApi.userId();
    fetch(`http://webp-ilv-backend.cs.technikum-wien.at/messenger/get_users.php?token=${token}&id=${userId}`)
      .then(res => res.json())
      .then(data => this.contacts.set(data))
      .catch(err => console.error('Failed to load contacts', err));

  }

  loadConversation(otherUser: any) {
    console.log(otherUser);
    this.isLoading.set(true);
    const token = this.loginApi.token();
    const userId = this.loginApi.userId();
    this.receiverId = otherUser.id;
    fetch(`http://webp-ilv-backend.cs.technikum-wien.at/messenger/get_conversation.php?token=${token}&user1_id=${userId}&user2_id=${this.receiverId}`)
      .then(result => result.json())
      .then(data => {


        this.messages.set(data);
        console.log('SIGNAL:', this.messages());
        console.log('message', data);
      })
      .catch(() => this.errorMes.set("Something went wrong!"))
      .finally(() => this.isLoading.set(false));
      console.log("durch");
  }

  sendMessage(): void {
  console.log("sendMessage wurde ausgeführt!");
  const token = this.loginApi.token();
  const senderId = this.loginApi.userId();

  if (!token || !senderId || !this.receiverId) {
    console.log(senderId);
    console.log(token);
    console.log(this.receiverId);
    return;
  }

  const formData = new FormData();

  formData.append('token', token);
  formData.append('sender_id', senderId);
  formData.append('receiver_id', this.receiverId);
  formData.append('message', this.newMessage.trim());

  fetch(
    'http://webp-ilv-backend.cs.technikum-wien.at/messenger/send_message.php',
    {
      method: 'POST',
      body: formData
    }
  )
  .then(res => res.json())
  .then(() => {

    // sofort lokal hinzufügen
    this.messages.update(msgs => [
      ...msgs,
      {
        sender_id: senderId,
        message: this.newMessage
      }
    ]);

    this.newMessage = '';
    console.log("message sent");

  });
}

}


