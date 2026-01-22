import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Login } from '../../auth/login/login';
import { Header } from '../../../shared/components/header/header';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-auth-layout',
  imports: [Login,Header,Footer],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
constructor(
    private authService: Auth,
    private router: Router
  ) { }

  handleLogin(credentials: any) {
    const user = this.authService.login(credentials.username, credentials.password);

    if (!user) {
      alert('Invalid email or password');
      return;
    }

    switch (user.role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;

      case 'SUPPORT_ENGINEER':
        this.router.navigate(['/support']);
        break;

      case 'USER':
        this.router.navigate(['/user']);
        break;
    }
  }
}
