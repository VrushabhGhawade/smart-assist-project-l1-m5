import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../../core/components/header/header';
import { Footer } from '../../../core/components/footer/footer';

@Component({
  selector: 'app-auth-layout',
  imports: [ Header, Footer, RouterModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  version: string = 'L1-M4';
  develop: string = 'Smart Assist Team';
  constructor(
    private router: Router
  ) { }

 
}
