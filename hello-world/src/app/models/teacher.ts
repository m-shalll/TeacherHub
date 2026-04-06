export interface Teacher {
  id: number;
  fullName: string;
  /**
   * Back-compat with initial scaffold.
   * New UI prefers `subjects`.
   */
  subject?: string;
  subjects: string[];
  email: string;
  curriculum: 'Igcse' | 'American' | 'National' | 'Public';
  phone?: string;
  bio?: string;
  experienceYears?: number;
  avatarUrl?: string;
  social?: {
    website?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

