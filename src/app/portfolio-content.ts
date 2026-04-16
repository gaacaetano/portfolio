export interface HeroContent {
  resumeLinks: Record<string, string>;
}

export interface ProjectEntry {
  name: string;
  company: string;
  imageUrl: string;
  tags: string[];
  summaryKey: string;
  featured?: boolean;
  link?: string;
}

export interface RoleTimelineEntry {
  titleKey?: string;
  title?: string;
  periodLabelKey?: string;
  periodLabel?: string;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  employmentTypeKey?: string;
  employmentType?: string;
  highlightValue?: string;
  highlightLabelKey?: string;
}

export interface CompanyTimelineEntry {
  company: string;
  companyDisplayName?: string;
  logos: { name: string; imageUrl: string }[];
  overallPeriodKey?: string;
  overallPeriod?: string;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  summaryKey?: string;
  summary?: string;
  workMode: 'primary' | 'parallel';
  employmentTypeKey?: string;
  employmentType?: string;
  roles: RoleTimelineEntry[];
  pending?: boolean;
}

export interface CompetencyEntry {
  titleKey: string;
  descriptionKey: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x' | 'email' | 'phone';
}

export interface ContactLinkGroup {
  titleKey: string;
  links: ContactLink[];
}

export const heroContent: HeroContent = {
  resumeLinks: {
    pt: 'https://www.icloud.com/iclouddrive/0ccbrISwVsb9wbR-dbLaSlKUQ#CV_-_Portuguese',
    en: 'https://www.icloud.com/iclouddrive/0fcwxwaym_uWgkW21VE1JzoIQ#CV_-_English',
    es: 'https://www.icloud.com/iclouddrive/0fcwxwaym_uWgkW21VE1JzoIQ#CV_-_English'
  }
};

export const projectEntries: ProjectEntry[] = [
  {
    name: 'EF Core Migration Buddy',
    company: 'Pessoal',
    imageUrl: '../../assets/projects/ef_core_migration_buddy.png',
    tags: ['TypeScript', 'Node.js', 'VSCE', 'VS Code Extension API'],
    summaryKey: 'projects_section.items.ef_core_migration_buddy.summary',
    link: 'https://marketplace.visualstudio.com/items?itemName=gaacaetano.ef-core-migration-buddy',
    featured: true
  },
  {
    name: 'Sistema de Gestão Educacional',
    company: 'R3+ TopTech',
    imageUrl: '../../assets/projects/r3_platform.jpg',
    tags: ['.NET Core', 'Dapper', 'PostgreSQL', 'React', 'Azure Pipelines'],
    summaryKey: 'projects_section.items.education_platform.summary',
    featured: true
  },
  {
    name: 'Registro Eletrônico de Lotes (EBR)',
    company: 'D7 Innovation',
    imageUrl: '../../assets/projects/d7_project.jpg',
    tags: ['.NET Core', 'Angular', 'Azure Pipelines'],
    summaryKey: 'projects_section.items.ebr.summary',
    featured: true
  },
  {
    name: 'Cadastro Único (CADU)',
    company: 'CBYK (GOL Airlines)',
    imageUrl: '../../assets/projects/api.jpg',
    tags: ['.NET Core', 'Oracle', 'Docker', 'Azure DevOps', 'OKE', 'Checkmarx'],
    summaryKey: 'projects_section.items.cadu.summary',
    featured: true
  },
  {
    name: 'Consulta de Milhas',
    company: 'CBYK (GOL Airlines)',
    imageUrl: '../../assets/projects/api.jpg',
    tags: ['.NET Core', 'MongoDB', 'Docker', 'Azure DevOps', 'OKE', 'Checkmarx'],
    summaryKey: 'projects_section.items.consult_miles.summary',
    featured: true
  },
  {
    name: 'WhatsApp Worker',
    company: 'CBYK (GOL Airlines)',
    imageUrl: '../../assets/projects/api.jpg',
    tags: ['.NET Core', 'MongoDB', 'Docker', 'Azure DevOps', 'OKE', 'Checkmarx'],
    summaryKey: 'projects_section.items.whatsapp_worker.summary',
    featured: true
  },
  {
    name: 'Passenger Service System (PSS)',
    company: 'CBYK (GOL Airlines)',
    imageUrl: '../../assets/projects/api.jpg',
    tags: ['.NET Core', 'Oracle', 'Docker', 'Azure DevOps', 'OKE', 'Checkmarx'],
    summaryKey: 'projects_section.items.pss.summary',
    featured: true
  },
  {
    name: 'Manager Platform',
    company: 'Connekt',
    imageUrl: '../../assets/projects/connekt_platform.jpg',
    tags: ['Java + Spring Boot', 'MySQL', 'Jenkins', 'Angular', 'AWS'],
    summaryKey: 'projects_section.items.manager_platform.summary',
    link: 'https://www.connekt.com.br/',
    featured: true
  }
];

export const experienceEntries: CompanyTimelineEntry[] = [
  {
    company: 'CBYK (GOL Airlines)',
    companyDisplayName: 'CBYK (GOL Airlines)',
    logos: [
      { name: 'CBYK', imageUrl: '../../assets/companies/cbyk_logo.jpeg' },
      { name: 'GOL', imageUrl: '../../assets/companies/gol_logo.jpeg' }
    ],
    startDate: '2021-01',
    endDate: null,
    current: true,
    summaryKey: 'experience_section.items.cbyk.summary',
    workMode: 'primary',
    employmentTypeKey: 'experience_section.employment.full_time',
    pending: false,
    roles: [
      {
        titleKey: 'experience_section.items.cbyk.role_1.title',
        startDate: '2021-01',
        endDate: null,
        current: true,
        employmentTypeKey: 'experience_section.employment.full_time'
      }
    ]
  },
  // {
  //   company: 'R3+',
  //   companyDisplayName: 'R3+',
  //   logos: [{ name: 'R3+', imageUrl: '../../assets/companies/r3maistoptech_logo.jpeg' }],
  //   startDate: '2024-12',
  //   endDate: null,
  //   current: true,
  //   summaryKey: 'experience_section.items.r3.summary',
  //   workMode: 'parallel',
  //   employmentTypeKey: 'experience_section.employment.part_time',
  //   pending: false,
  //   roles: [
  //     {
  //       titleKey: 'experience_section.items.r3.role_1.title',
  //       startDate: '2024-12',
  //       endDate: null,
  //       current: true,
  //       employmentTypeKey: 'experience_section.employment.part_time'
  //     }
  //   ]
  // },
  // {
  //   company: 'D7 Innovation',
  //   companyDisplayName: 'D7',
  //   logos: [{ name: 'D7', imageUrl: '../../assets/companies/d7_innovation_logo.jpeg' }],
  //   startDate: '2022-10',
  //   endDate: '2024-01',
  //   current: false,
  //   summaryKey: 'experience_section.items.d7.summary',
  //   workMode: 'parallel',
  //   employmentTypeKey: 'experience_section.employment.part_time',
  //   pending: false,
  //   roles: [
  //     {
  //       titleKey: 'experience_section.items.d7.role_1.title',
  //       startDate: '2023-01',
  //       endDate: '2023-12',
  //       current: false,
  //       employmentTypeKey: 'experience_section.employment.part_time'
  //     }
  //   ]
  // },
  {
    company: 'Connekt',
    companyDisplayName: 'Connekt',
    logos: [{ name: 'Connekt', imageUrl: '../../assets/companies/connektats_logo.jpeg' }],
    startDate: '2020-03',
    endDate: '2021-01',
    current: false,
    summaryKey: 'experience_section.items.connekt.summary',
    workMode: 'primary',
    employmentTypeKey: 'experience_section.employment.full_time',
    pending: false,
    roles: [
      {
        titleKey: 'experience_section.items.connekt.role_1.title',
        startDate: '2020-03',
        endDate: '2021-01',
        current: false,
        employmentTypeKey: 'experience_section.employment.full_time'
      }
    ]
  },
  {
    company: 'TecBan',
    companyDisplayName: 'TecBan',
    logos: [{ name: 'TecBan', imageUrl: '../../assets/companies/tecban_logo.jpeg' }],
    startDate: '2015-07',
    endDate: '2020-02',
    current: false,
    summaryKey: 'experience_section.items.tecban.summary',
    workMode: 'primary',
    employmentTypeKey: 'experience_section.employment.full_time',
    pending: false,
    roles: [
      {
        titleKey: 'experience_section.items.tecban.role_5.title',
        startDate: '2017-09',
        endDate: '2020-02',
        employmentTypeKey: 'experience_section.employment.full_time'
      },
      {
        titleKey: 'experience_section.items.tecban.role_4.title',
        startDate: '2016-10',
        endDate: '2017-08',
        employmentTypeKey: 'experience_section.employment.full_time'
      },
      {
        titleKey: 'experience_section.items.tecban.role_3.title',
        startDate: '2016-04',
        endDate: '2016-09',
        employmentTypeKey: 'experience_section.employment.full_time'
      },
      {
        titleKey: 'experience_section.items.tecban.role_2.title',
        startDate: '2015-09',
        endDate: '2016-03',
        employmentTypeKey: 'experience_section.employment.full_time'
      },
      {
        titleKey: 'experience_section.items.tecban.role_1.title',
        startDate: '2015-07',
        endDate: '2015-08',
        employmentTypeKey: 'experience_section.employment.full_time'
      }
    ]
  },
];

export const competencyEntries: CompetencyEntry[] = [
  {
    titleKey: 'about_contact_section.competencies.system_design.title',
    descriptionKey: 'about_contact_section.competencies.system_design.description'
  },
  {
    titleKey: 'about_contact_section.competencies.performance.title',
    descriptionKey: 'about_contact_section.competencies.performance.description'
  },
  {
    titleKey: 'about_contact_section.competencies.integration.title',
    descriptionKey: 'about_contact_section.competencies.integration.description'
  },
  {
    titleKey: 'about_contact_section.competencies.security_auth.title',
    descriptionKey: 'about_contact_section.competencies.security_auth.description'
  }
];

export const technicalStack = [
  { name: '.NET', imageUrl: '../../assets/skills/dotnetcore.svg' },
  { name: 'C#', imageUrl: '../../assets/skills/csharp.svg' },
  { name: 'Docker', imageUrl: '../../assets/skills/docker.svg' },
  { name: 'Git', imageUrl: '../../assets/skills/git.svg' },
  { name: 'MongoDB', imageUrl: '../../assets/skills/mongodb.svg' },
  { name: 'MySQL', imageUrl: '../../assets/skills/mysql.svg' },
  { name: 'SQL Developer', imageUrl: '../../assets/skills/sqldeveloper.svg' },
  { name: 'Angular', imageUrl: '../../assets/skills/angular.svg' },
  { name: 'Angular Material', imageUrl: '../../assets/skills/angularmaterial.svg' },
  { name: 'Tailwind CSS', imageUrl: '../../assets/skills/tailwind.svg' },
  { name: 'TypeScript', imageUrl: '../../assets/skills/typescript.svg' },
  { name: 'AWS', imageUrl: '../../assets/skills/aws.svg' },
  { name: 'Azure', imageUrl: '../../assets/skills/azure.svg' },
  { name: 'Firebase', imageUrl: '../../assets/skills/firebase.svg' }
];

export const contactLinkGroups: ContactLinkGroup[] = [
  {
    titleKey: 'about_contact_section.contact_groups.social',
    links: [
      { label: 'GitHub', href: 'https://github.com/gaacaetano', icon: 'github' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gaacaetano', icon: 'linkedin' },
      { label: '@gaacaetano', href: 'https://x.com/gaacaetano', icon: 'x' }
    ]
  },
  {
    titleKey: 'about_contact_section.contact_groups.contact',
    links: [
      { label: 'gabrielcaetano@outlook.com', href: 'mailto:gabrielcaetano@outlook.com', icon: 'email' },
      { label: '+55 11 92159-8424', href: 'https://wa.me/5511921598424', icon: 'phone' }
    ]
  }
];
