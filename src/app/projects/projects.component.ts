import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface CompanyImage {
  name: string;
  imageUrl: string;
}

interface Project {
  name: string;
  company: string;
  imageUrl: string;
  technologies: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    { name: 'Manager Platform', company: 'Connekt', imageUrl: '../../assets/projects/manager_platform.jpg', technologies: 'Java, Spring Boot, MySQL, Jenkins, Angular, AWS' },
    { name: 'Passenger Service System (PSS)', company: 'GOL', imageUrl: '../../assets/projects/default.webp', technologies: '.NET Core, Oracle, Docker, Azure DevOps, Azure Pipelines, OKE, Checkmarx' },
    { name: 'WhatsApp Worker', company: 'GOL', imageUrl: '../../assets/projects/default.webp', technologies: '.NET Core, MongoDB, Docker, Azure DevOps, Azure Pipelines, OKE, Checkmarx' },
    { name: 'Consult Miles', company: 'GOL', imageUrl: '../../assets/projects/default.webp', technologies: '.NET Core, MongoDB, Docker, Azure DevOps, Azure Pipelines, OKE, Checkmarx' }
  ];

  companies: CompanyImage[] = [
    { name: 'TecBan', imageUrl: '../../assets/companies/tecban_logo.jpeg' },
    { name: 'Connekt', imageUrl: '../../assets/companies/connektats_logo.jpeg' },
    { name: 'GOL', imageUrl: '../../assets/companies/gol_logo.jpeg' },
    { name: 'CBYK', imageUrl: '../../assets/companies/cbyk_logo.jpeg' },
    { name: 'D7 Innovation', imageUrl: '../../assets/companies/d7_innovation_logo.jpeg' },
    { name: 'R3+ TopTech', imageUrl: '../../assets/companies/r3maistoptech_logo.jpeg' }
  ];

  currentProjectIndex = 0;
  animationTrigger = 0;
  isFading = false;

  get currentProject(): Project {
    return this.projects[this.currentProjectIndex];
  }

  nextProject(): void {
    this.startFadeTransition();
    setTimeout(() => {
      this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
      this.endFadeTransition();
    }, 150);
  }

  previousProject(): void {
    this.startFadeTransition();
    setTimeout(() => {
      this.currentProjectIndex = this.currentProjectIndex === 0
        ? this.projects.length - 1
        : this.currentProjectIndex - 1;
      this.endFadeTransition();
    }, 150);
  }

  goToProject(index: number): void {
    if (index >= 0 && index < this.projects.length && index !== this.currentProjectIndex) {
      this.startFadeTransition();
      setTimeout(() => {
        this.currentProjectIndex = index;
        this.endFadeTransition();
      }, 150);
    }
  }

  private startFadeTransition(): void {
    this.isFading = true;
  }

  private endFadeTransition(): void {
    this.animationTrigger++;
    setTimeout(() => {
      this.isFading = false;
    }, 50);
  }

  getTechnologiesInRows(technologies: string): string[][] {
    const techArray = technologies.split(',').map(tech => tech.trim());
    const rows: string[][] = [];
    for (let i = 0; i < techArray.length; i += 4) {
      rows.push(techArray.slice(i, i + 4));
    }
    return rows;
  }
}
