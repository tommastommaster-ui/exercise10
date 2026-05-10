import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { LoginApi } from '../../api.service';


@Component({
  selector: 'app-message-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})


export class MessageList {

  readonly messages = signal<any[]>([]);
  readonly isLoading = signal(false);
  readonly errorMes = signal('');

  readonly contacts = signal<any[]>([]);
  readonly receiverId = signal<any | null>(null);
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

  loadConversation(user: any) {
    console.log(user);
    this.isLoading.set(true);
    const token = this.loginApi.token();
    const userId = this.loginApi.userId();
    fetch(`http://webp-ilv-backend.cs.technikum-wien.at/messenger/get_conversation.php?token=${token}&user1_id=${userId}&user2_id=${user.id}`)
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

}


