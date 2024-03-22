import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface SkillImage {
  skill: string;
  imageUrl: string;
}

@Component({
  selector: 'app-skills-services',
  standalone: true,
  imports: [
    TranslateModule,
  ],
  templateUrl: './skills-services.component.html',
  styleUrl: './skills-services.component.css'
})
export class SkillsServicesComponent {
  images: SkillImage[] = [
    { skill: 'dotnet', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
    { skill: 'chsarp', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
    { skill: 'docker', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' }
  ];
}
