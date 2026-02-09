import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-header',
  imports: [],
  templateUrl: './title-header.html',
  styleUrl: './title-header.scss',
})
export class TitleHeader {
@Input() header:string='';
@Input() subHeader:string='';
}
