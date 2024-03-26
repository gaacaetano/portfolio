import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule
  ],
  templateUrl: './skills-services.component.html',
  styleUrl: './skills-services.component.css'
})
export class SkillsServicesComponent {
  skills: SkillImage[] = [
    { skill: '.NET', imageUrl: '../../assets/skills/dotnetcore.svg' },
    { skill: 'C#', imageUrl: '../../assets/skills/csharp.svg' },
    { skill: 'Docker', imageUrl: '../../assets/skills/docker.svg' },
    { skill: 'Git', imageUrl: '../../assets/skills/git.svg' },
    { skill: 'MongoDB', imageUrl: '../../assets/skills/mongodb.svg' },
    { skill: 'MySQL', imageUrl: '../../assets/skills/mysql.svg' },
    { skill: 'SQL Developer', imageUrl: '../../assets/skills/sqldeveloper.svg' },
    { skill: 'Angular', imageUrl: '../../assets/skills/angular.svg' },
    { skill: 'Angular Material', imageUrl: '../../assets/skills/angularmaterial.svg' },
    { skill: 'Tailwind CSS', imageUrl: '../../assets/skills/tailwind.svg' },
    { skill: 'Typescript', imageUrl: '../../assets/skills/typescript.svg' },
    { skill: 'AWS', imageUrl: '../../assets/skills/aws.svg' },
    { skill: 'Azure', imageUrl: '../../assets/skills/azure.svg' },
    { skill: 'Firebase', imageUrl: '../../assets/skills/firebase.svg' }
  ];
}
