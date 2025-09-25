import { Component, HostListener, ViewChild } from '@angular/core';
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
        if (entry.isIntersecting && window.innerWidth >= 1920) {
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
    const element = document.getElementById("projects");
    if (element) {
      this.smoothScrollTo(element.offsetTop, 1500);
    }
  }

  goToSkillsAndServicesSection() {
    const element = document.getElementById("skills-services");
    if (element) {
      this.smoothScrollTo(element.offsetTop, 1500);
    }
  }

  goToAboutMeSection() {
    const element = document.getElementById("about-me");
    if (element) {
      const targetPosition = this.getMobileAdjustedScrollPosition(element);
      this.smoothScrollTo(targetPosition, 1500);
    }
  }

  goToContactSection() {
    const element = document.getElementById("contact");
    if (element) {
      this.smoothScrollTo(element.offsetTop, 1500);
    }
  }

  goToTop() {
    const element = document.getElementById("main");
    if (element) {
      this.smoothScrollTo(element.offsetTop, 1500); // 1.5 segundos
    }
  }

  private getMobileAdjustedScrollPosition(element: HTMLElement): number {
    // Usar getBoundingClientRect para calcular posição mais precisa
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calcular a posição absoluta do elemento
    let targetPosition = rect.top + scrollTop;

    // Verificar se estamos em um dispositivo móvel com navegador
    const isMobileBrowser = window.innerWidth <= 768 &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
       /Safari|iPhone|iPad|iPod/.test(navigator.userAgent)); // Detectar Safari mobile

    if (isMobileBrowser) {
      // Pequeno delay para garantir que as barras do navegador estabilizaram
      // Isso é importante porque as barras aparecem/desaparecem dinamicamente
      setTimeout(() => {
        this.adjustForDynamicBars(element);
      }, 100);

      // Usar Visual Viewport API se disponível (mais precisa para barras de navegação móveis)
      const visualViewport = (window as any).visualViewport;

      if (visualViewport) {
        // Calcular considerando as barras atuais do navegador
        const visualHeight = visualViewport.height;
        const pageHeight = window.innerHeight;

        // Diferença indica quanto espaço está ocupado pelas barras do navegador
        const browserBarsHeight = pageHeight - visualHeight;

        // Offset adicional para compensar mudanças dinâmicas das barras
        const dynamicOffset = Math.max(visualHeight * 0.12, 70); // 12% da altura visual ou mínimo 70px

        // Ajustar posição considerando barras do navegador + margem de segurança
        targetPosition = Math.max(0, targetPosition - browserBarsHeight - dynamicOffset);

        console.log('Mobile scroll adjustment:', {
          visualHeight,
          pageHeight,
          browserBarsHeight,
          dynamicOffset,
          finalPosition: targetPosition
        });
      } else {
        // Fallback mais agressivo para navegadores sem Visual Viewport API
        const fallbackOffset = Math.max(window.innerHeight * 0.18, 100); // 18% da altura ou mínimo 100px
        targetPosition = Math.max(0, targetPosition - fallbackOffset);
      }
    }

    return targetPosition;
  }

  private adjustForDynamicBars(element: HTMLElement): void {
    // Listener adicional para mudanças na viewport (barras aparecendo/desaparecendo)
    const visualViewport = (window as any).visualViewport;
    if (visualViewport) {
      const handleViewportChange = () => {
        // Se as barras mudarem dinamicamente, poderíamos re-ajustar
        // Por enquanto, apenas log para debug
        console.log('Viewport changed:', {
          height: visualViewport.height,
          width: visualViewport.width,
          offsetTop: visualViewport.offsetTop
        });
      };

      visualViewport.addEventListener('resize', handleViewportChange);
      visualViewport.addEventListener('scroll', handleViewportChange);
    }
  }

  private smoothScrollTo(targetPosition: number, duration: number = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}
