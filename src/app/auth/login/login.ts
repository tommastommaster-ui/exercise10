import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginApi } from '../../api.service'; 
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private loginApi = inject(LoginApi);
  
  username = '';
  password = '';

  async onSubmit(){
    const success = await this.loginApi.login(
      this.username,
      this.password
    );
    if(!success) {
      console.log("wrong username or password");
    }
    else{
      this.router.navigate(['/messages']);
    }
  }

}
