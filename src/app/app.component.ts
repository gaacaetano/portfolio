import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsServicesComponent } from './skills-services/skills-services.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { ViewportScroller } from '@angular/common';

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
    ProjectsComponent,
    SkillsServicesComponent,
    AboutMeComponent,
    ContactComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild(MatSelect) select!: MatSelect;

  title = 'Gabriel Caetano - Software Engineer';
  languages: Language[] = [
    { value: 'pt', imageUrl: '../assets/languages/portuguese.png' },
    { value: 'en', imageUrl: '../assets/languages/english.png' },
    { value: 'es', imageUrl: '../assets/languages/spanish.png' }
  ];
  cvLinks: string[] = [
    'https://www.icloud.com/iclouddrive/0ccbrISwVsb9wbR-dbLaSlKUQ#CV_-_Portuguese',
    'https://www.icloud.com/iclouddrive/0fcwxwaym_uWgkW21VE1JzoIQ#CV_-_English'
  ];
  cvLinkSelected = "https://www.icloud.com/iclouddrive/0ccbrISwVsb9wbR-dbLaSlKUQ#CV_-_Portuguese";
  selectedLanguage = this.languages[0];
  isMainSelected = true;

  constructor(private translateService: TranslateService, private scroller: ViewportScroller) {
    translateService.addLangs(['en', 'pt', 'br']);
    translateService.setDefaultLang('pt');
  }

  ngOnInit() {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-left');
          return;
        }

        entry.target.classList.remove('animate-fade-in-left');
      });
    }, { threshold: 0.01 });

    document.querySelectorAll('.effect-div').forEach(target => {
      observer.observe(target);
    });
  }

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    let position: [number, number] = this.scroller.getScrollPosition();
    if (position[0] == 0 && position[1] == 0) {
      this.isMainSelected = true;
    } else {
      this.isMainSelected = false;
    }
  }

  handleSelectionChange() {
    this.translateService.use(this.selectedLanguage.value);
    this.cvLinkSelected = this.selectedLanguage.value != 'pt' ? this.cvLinks[1] : this.cvLinks[0];
    this.select.close();
  }

  goToProjectsSection() {
    document.getElementById("projects")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  goToSkillsAndServicesSection() {
    document.getElementById("skills-services")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  goToAboutMeSection() {
    document.getElementById("about-me")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  goToContactSection() {
    document.getElementById("contact")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  goToTop() {
    document.getElementById("main")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}
