import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CompanyTimelineEntry, RoleTimelineEntry, experienceEntries } from '../portfolio-content';

interface TimelinePeriodGroup {
  periodKey: string;
  entries: CompanyTimelineEntry[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experienceEntries = experienceEntries;
  timelineGroups: TimelinePeriodGroup[];

  constructor(private translateService: TranslateService) {
    this.timelineGroups = this.buildTimelineGroups(experienceEntries);
  }

  resolveText(value?: string, key?: string): string {
    if (value) {
      return value;
    }

    return key ? this.translateService.instant(key) : '';
  }

  resolveOverallPeriod(experience: CompanyTimelineEntry): string {
    if (experience.overallPeriod) {
      return experience.overallPeriod;
    }

    if (experience.overallPeriodKey) {
      return this.translateService.instant(experience.overallPeriodKey);
    }

    if (experience.startDate) {
      return this.formatPeriod(experience.startDate, experience.endDate, experience.current ?? false);
    }

    const labels = experience.roles
      .map((role) => this.resolveText(role.periodLabel, role.periodLabelKey))
      .filter(Boolean);

    if (labels.length === 0) {
      return '';
    }

    if (labels.length === 1) {
      return labels[0];
    }

    return `${labels[0]} - ${labels[labels.length - 1]}`;
  }

  resolveRolePeriod(role: RoleTimelineEntry): string {
    if (role.periodLabel) {
      return role.periodLabel;
    }

    if (role.periodLabelKey) {
      return this.translateService.instant(role.periodLabelKey);
    }

    if (role.startDate) {
      return this.formatPeriod(role.startDate, role.endDate, role.current ?? false);
    }

    return '';
  }

  roleCardClasses(role: RoleTimelineEntry): string {
    return 'timeline-role-card';
  }

  companyCardClasses(experience: CompanyTimelineEntry): string {
    return experience.workMode === 'parallel' || experience.employmentTypeKey === 'experience_section.employment.part_time'
      ? 'timeline-company-card timeline-company-card-parallel'
      : 'timeline-company-card';
  }

  groupClasses(group: TimelinePeriodGroup, index: number): string {
    const classes = ['timeline-group'];

    if (group.entries.length > 1) {
      classes.push('timeline-group-shared');
    } else {
      classes.push(index % 2 === 0 ? 'timeline-group-left' : 'timeline-group-right');
    }

    return classes.join(' ');
  }

  groupHasCurrentEntry(group: TimelinePeriodGroup): boolean {
    return group.entries.some((entry) => entry.current);
  }

  private formatPeriod(startDate: string, endDate?: string | null, current = false): string {
    const start = this.formatMonthYear(startDate);
    const end = current || !endDate
      ? this.translateService.instant('experience_section.present')
      : this.formatMonthYear(endDate);

    return `${start} - ${end}`;
  }

  private formatMonthYear(value: string): string {
    const [year, month] = value.split('-').map(Number);
    const date = new Date(year, (month || 1) - 1, 1);

    return new Intl.DateTimeFormat(this.translateService.currentLang || this.translateService.getDefaultLang() || 'pt', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  private buildTimelineGroups(entries: CompanyTimelineEntry[]): TimelinePeriodGroup[] {
    const groupedEntries = new Map<string, CompanyTimelineEntry[]>();

    for (const entry of entries) {
      const periodKey = this.buildPeriodKey(entry);
      const existingEntries = groupedEntries.get(periodKey) ?? [];
      existingEntries.push(entry);
      groupedEntries.set(periodKey, existingEntries);
    }

    return Array.from(groupedEntries.entries()).map(([periodKey, grouped]) => ({
      periodKey,
      entries: grouped
    }));
  }

  private buildPeriodKey(entry: CompanyTimelineEntry): string {
    return `${entry.startDate ?? ''}|${entry.current ? 'present' : entry.endDate ?? ''}`;
  }
}
