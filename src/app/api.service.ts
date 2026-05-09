import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginApi {

  token = signal<string | null>(null);
  userId = signal<string | null>(null);
  username = signal<string | null>(null);

  async login(username: string, password: string) {
    // später API Call hier
    const formData = new FormData();
    formData.append('username_or_email', username);
    formData.append('password', password);
    try {
      const result = await fetch(
        'http://webp-ilv-backend.cs.technikum-wien.at/messenger/login.php',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await result.json();

      if (data.token && data.id) {

        // 🔑 State speichern
        this.token.set(data.token);
        this.userId.set(data.id);
        this.username.set(username);

        // 💾 optional persistieren
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', username);

        return true;
      }

      return false;

    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  

  logout() {
    this.token.set(null);
    this.userId.set(null);
    this.username.set(null);

    localStorage.clear();
  }

}