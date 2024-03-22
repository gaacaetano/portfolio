import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Language {
  value: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gabriel Caetano - Software Engineer';
  languages: Language[] = [
    { value: 'pt', imageUrl: '../assets/portuguese.png' },
    { value: 'en', imageUrl: '../assets/english.png' },
    { value: 'es', imageUrl: '../assets/spanish.png' }
  ]
  selectedLanguage = this.languages[0];

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'pt', 'br']);
    translateService.setDefaultLang('pt');
  }

  handleSelectionChange() {
    this.translateService.use(this.selectedLanguage.value);
  }
}
