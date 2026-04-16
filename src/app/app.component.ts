import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutContactComponent } from './about-contact/about-contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { heroContent } from './portfolio-content';

interface Language {
  value: 'pt' | 'en' | 'es';
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, ProjectsComponent, ExperienceComponent, AboutContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gabriel Caetano - Software Engineer';
  isMobileMenuOpen = false;
  languages: Language[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' }
  ];
  selectedLanguage: Language = this.languages[0];
  currentSection = 'home';

  readonly navItems = [
    { id: 'home', labelKey: 'navigation.home' },
    { id: 'projects', labelKey: 'navigation.projects' },
    { id: 'experience', labelKey: 'navigation.experience' },
    { id: 'about-contact', labelKey: 'navigation.about' },
    { id: 'contact', labelKey: 'navigation.contact' }
  ];

  readonly heroContent = heroContent;

  constructor(
    private translateService: TranslateService,
    private scroller: ViewportScroller
  ) {
    translateService.addLangs(['pt', 'en', 'es']);
    translateService.setDefaultLang('pt');
    translateService.use('pt');
  }

  setLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.translateService.use(language.value);
    this.isMobileMenuOpen = false;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const offset = sectionId === 'home' ? 0 : element.offsetTop - 48;
    this.currentSection = sectionId;
    this.isMobileMenuOpen = false;
    this.smoothScrollTo(offset, 550);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openResume(): void {
    window.open(this.heroContent.resumeLinks[this.selectedLanguage.value], '_blank', 'noopener,noreferrer');
  }

  @HostListener('window:scroll')
  onViewportScroll(): void {
    const midpoint = window.scrollY + window.innerHeight * 0.35;

    for (const item of [...this.navItems].reverse()) {
      const element = document.getElementById(item.id);
      if (element && midpoint >= element.offsetTop) {
        this.currentSection = item.id;
        return;
      }
    }

    this.currentSection = 'home';
  }

  private smoothScrollTo(targetPosition: number, duration: number): void {
    const startPosition = this.scroller.getScrollPosition()[1];
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}
