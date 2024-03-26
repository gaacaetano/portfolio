import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    TranslateModule,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  years = { value: '' };

  ngOnInit() {
    let diff = (new Date().getTime() - new Date('1996-10-14').getTime()) / 1000;
    diff /= (60 * 60 * 24);
    this.years.value = Math.abs(Math.round(diff / 365.25)).toString();
  }
}
