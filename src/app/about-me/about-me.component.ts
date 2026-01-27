import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AboutMeComponent implements OnInit, OnDestroy {
  years = { value: '' };
  
  // Valores finais para contagem
  finalYears = 8;
  finalProjects = 10;
  finalCompanies = 6;
  
  // Valores atuais (animados)
  currentYears = 0;
  currentProjects = 0;
  currentCompanies = 0;
  
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  ngOnInit() {
    let diff = (new Date().getTime() - new Date('1996-10-14').getTime()) / 1000;
    diff /= (60 * 60 * 24);
    this.years.value = Math.abs(Math.round(diff / 365.25)).toString();
    
    // Observar quando a seção entra na viewport
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateNumbers();
        }
      });
    }, {
      threshold: 0.3
    });

    // Observar a seção de stats
    setTimeout(() => {
      const statsSection = document.querySelector('#about-me .stats-section');
      if (statsSection) {
        this.observer?.observe(statsSection);
      }
    });
  }

  private animateNumbers() {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    // Animar todos ao mesmo tempo
    this.animateValue('currentYears', 0, this.finalYears, steps, stepDuration);
    this.animateValue('currentProjects', 0, this.finalProjects, steps, stepDuration);
    this.animateValue('currentCompanies', 0, this.finalCompanies, steps, stepDuration);
  }

  private animateValue(property: string, start: number, end: number, steps: number, stepDuration: number) {
    let currentStep = 0;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(Math.floor(start + (increment * currentStep)), end);
      
      if (property === 'currentYears') {
        this.currentYears = currentValue;
      } else if (property === 'currentProjects') {
        this.currentProjects = currentValue;
      } else if (property === 'currentCompanies') {
        this.currentCompanies = currentValue;
      }

      if (currentStep >= steps) {
        // Garantir valor final exato
        if (property === 'currentYears') {
          this.currentYears = end;
        } else if (property === 'currentProjects') {
          this.currentProjects = end;
        } else if (property === 'currentCompanies') {
          this.currentCompanies = end;
        }
        clearInterval(timer);
      }
    }, stepDuration);
  }
}
