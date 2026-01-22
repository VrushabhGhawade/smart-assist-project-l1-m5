import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [ CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

}
