import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { competencyEntries, contactLinkGroups, technicalStack } from '../portfolio-content';
import { Subscription } from 'rxjs';

interface HighlightedTitleLine {
  before: string;
  accent: string;
  after: string;
}

@Component({
  selector: 'app-about-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './about-contact.component.html',
  styleUrl: './about-contact.component.css'
})
export class AboutContactComponent implements OnInit, OnDestroy {
  years = { value: '' };
  finalYears = 8;
  finalProjects = 10;
  finalCompanies = 6;
  currentYears = 0;
  currentProjects = 0;
  currentCompanies = 0;
  currentYear = new Date().getFullYear();

  competencyEntries = competencyEntries;
  technicalStack = technicalStack;
  contactLinkGroups = contactLinkGroups;
  aboutTitleLines: HighlightedTitleLine[] = [];

  form = new FormGroup({
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  private observer?: IntersectionObserver;
  private hasAnimated = false;
  private langChangeSubscription?: Subscription;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    const birthDate = new Date('1996-10-14');
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    this.years.value = age.toString();
    this.updateAboutTitleLines();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (_event: LangChangeEvent) => this.updateAboutTitleLines()
    );
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.langChangeSubscription?.unsubscribe();
  }

  handleSendClick(): void {
    const subject = encodeURIComponent(this.form.get('subject')?.value ?? '');
    const message = encodeURIComponent(this.form.get('message')?.value ?? '');
    location.href = `mailto:gabrielcaetano@outlook.com?subject=${subject}&body=${message}`;
    this.form.reset();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateNumbers();
        }
      });
    }, { threshold: 0.35 });

    setTimeout(() => {
      const statsSection = document.querySelector('#about-contact .editorial-stats');
      if (statsSection) {
        this.observer?.observe(statsSection);
      }
    });
  }

  private animateNumbers(): void {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    this.animateValue('currentYears', this.finalYears, steps, stepDuration);
    this.animateValue('currentProjects', this.finalProjects, steps, stepDuration);
    this.animateValue('currentCompanies', this.finalCompanies, steps, stepDuration);
  }

  private animateValue(
    property: 'currentYears' | 'currentProjects' | 'currentCompanies',
    end: number,
    steps: number,
    stepDuration: number
  ): void {
    let currentStep = 0;
    const increment = end / steps;

    const timer = setInterval(() => {
      currentStep += 1;
      const currentValue = Math.min(Math.floor(increment * currentStep), end);
      this[property] = currentValue;

      if (currentStep >= steps) {
        this[property] = end;
        clearInterval(timer);
      }
    }, stepDuration);
  }

  private updateAboutTitleLines(): void {
    const rawTitle = this.translateService.instant('about_contact_section.title_pattern') as string;
    this.aboutTitleLines = rawTitle
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^(.*?)\[\[(.*?)\]\](.*)$/);

        if (!match) {
          return {
            before: line,
            accent: '',
            after: ''
          };
        }

        return {
          before: match[1],
          accent: match[2],
          after: match[3]
        };
      });
  }
}
