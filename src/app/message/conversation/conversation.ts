import { Component, signal, inject } from '@angular/core';
import { LoginApi } from '../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversation',
  imports: [CommonModule],
  templateUrl: './conversation.html',
  styleUrl: './conversation.css',
})
export class Conversation {
  readonly messages = signal<any[]>([]);
  readonly isLoading = signal(false);
  readonly errorMes = signal('');

  //hardcoded
  receiverId = '1344';
  
  loginApi = inject(LoginApi);

  ngOnInit(): void{
    this.isLoading.set(true);
    const token = this.loginApi.token();
    const userId = this.loginApi.userId();
    fetch(`http://webp-ilv-backend.cs.technikum-wien.at/messenger/get_conversation.php?token=${token}&user1_id=${userId}&user2_id=${this.receiverId}`)
      .then(result => result.json())
      .then(data => this.messages.set(data))
      .catch(() => this.errorMes.set("Something went wrong!"))
      .finally(() => this.isLoading.set(false));
  }
}
