import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { Review } from '../models/review';
import { VideoContent } from '../models/video';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly storageKey = 'teacherhub.unlockedVideos.v1';

  private teachers: Teacher[] = [
    // IGCSE teachers (from igcse.json)
    {
      id: 1,
      fullName: 'Ahmed Abdel Aziz',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Experienced IGCSE physics teacher with strong academic background. Teaches at El Bashaer International School in Alexandria.',
      experienceYears: 18,
    },
    {
      id: 2,
      fullName: 'Dr. Nabil Elias',
      subject: 'Mathematics',
      subjects: ['Mathematics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Senior math teacher in British division schools. Alexandria.',
      experienceYears: 15,
    },
    {
      id: 3,
      fullName: 'Mostafa Allam',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Physics teacher in IGCSE departments. Alexandria.',
      experienceYears: 10,
    },
    {
      id: 4,
      fullName: 'Mohamed Sherif',
      subject: 'Chemistry',
      subjects: ['Chemistry'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Chemistry IGCSE teacher. Alexandria.',
      experienceYears: 10,
    },
    {
      id: 5,
      fullName: 'Magda Kamel',
      subject: 'ICT',
      subjects: ['ICT'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'ICT teacher known in IGCSE schools. Alexandria.',
      experienceYears: 12,
    },
    {
      id: 6,
      fullName: 'Taher El Shazly',
      subject: 'English',
      subjects: ['English'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'IG English teacher at international schools. Teaches online and offline from a center.',
      experienceYears: 10,
    },
    {
      id: 7,
      fullName: 'Ahmed Karam',
      subject: 'Mathematics',
      subjects: ['Mathematics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Popular math teacher in British curriculum. Teaches online and offline from a center.',
      experienceYears: 10,
    },
    {
      id: 8,
      fullName: 'Dr. Maha Soliman',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Physics specialist in IGCSE/A-Level. Teaches offline from a center.',
      experienceYears: 12,
    },
    {
      id: 9,
      fullName: 'Dr. Omneya Gad',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Biology teacher in IG programs. Teaches offline from a center.',
      experienceYears: 12,
    },
    {
      id: 10,
      fullName: 'Tony (English Tutor)',
      subject: 'English',
      subjects: ['English'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Private tutor with flexible teaching options — online and offline.',
      experienceYears: 12,
    },
    {
      id: 11,
      fullName: 'Dr. Peter Alfred',
      subject: 'Chemistry',
      subjects: ['Chemistry'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Highly recommended chemistry teacher among students. Teaches online and from a center.',
      experienceYears: 10,
    },
    {
      id: 12,
      fullName: 'Mr. Hussein Khaled',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Popular physics teacher with strong reputation. Teaches online and from a center.',
      experienceYears: 10,
    },
    {
      id: 13,
      fullName: 'Dr. Mina Adly',
      subject: 'Mathematics',
      subjects: ['Mathematics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Well-known math teacher in IG community. Teaches online.',
      experienceYears: 10,
    },
    {
      id: 14,
      fullName: 'Dr. Nihal Gabr',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Commonly recommended biology teacher. Teaches online and from a center.',
      experienceYears: 10,
    },
    {
      id: 15,
      fullName: 'Dr. Mohamed El Dahan',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Popular for A-Level Biology. Teaches online.',
      experienceYears: 10,
    },
    {
      id: 16,
      fullName: 'Loay Khalil',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Recognized physics teacher. Teaches from a center.',
      experienceYears: 10,
    },
    {
      id: 17,
      fullName: 'Seif Atef',
      subject: 'Mathematics',
      subjects: ['Mathematics'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Popular among OL/AS students. Teaches online.',
      experienceYears: 8,
    },
    {
      id: 18,
      fullName: 'Marco Youssef',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Known for high student results. Teaches small groups from a center.',
      experienceYears: 8,
    },
    {
      id: 19,
      fullName: 'Fadi Fahdi',
      subject: 'English',
      subjects: ['English'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'Recommended English tutor. Teaches online.',
      experienceYears: 8,
    },
    {
      id: 20,
      fullName: 'Abdullah Al-Garf',
      subject: 'ICT',
      subjects: ['ICT'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'IGCSE ICT teacher and British Council examiner. 19 years experience. Teaches at school and online.',
      experienceYears: 19,
    },
    {
      id: 21,
      fullName: 'Dr. Mohamed Ragab',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'One of the most popular IGCSE Biology teachers in Egypt, known for top achievers and structured courses. Has his own academy.',
      experienceYears: 22,
    },
    {
      id: 22,
      fullName: 'Hala Zoweil',
      subject: 'Chemistry',
      subjects: ['Chemistry'],
      curriculum: 'Igcse',
      email: '',
      phone: '',
      bio: 'IGCSE Chemistry teacher with long academic experience at an international school.',
      experienceYears: 19,
    },
    // American curriculum teachers (from american.json)
    {
      id: 23,
      fullName: 'Mahmoud Salah',
      subject: 'SAT Math',
      subjects: ['SAT Math'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Popular SAT Math instructor with strong student results. Teaches online and from a test prep center.',
      experienceYears: 10,
    },
    {
      id: 24,
      fullName: 'Ahmed Samir',
      subject: 'SAT English',
      subjects: ['SAT English'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Specialized in SAT Reading & Writing strategies. Teaches online.',
      experienceYears: 8,
    },
    {
      id: 25,
      fullName: 'Mina Nader',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Experienced American curriculum physics teacher. Teaches at an international school in Alexandria.',
      experienceYears: 12,
    },
    {
      id: 26,
      fullName: 'Nancy Adel',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Biology teacher in American division schools in Alexandria.',
      experienceYears: 10,
    },
    {
      id: 27,
      fullName: 'Karim Youssef',
      subject: 'Chemistry',
      subjects: ['Chemistry'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Known AP Chemistry tutor among American diploma students. Teaches online and from a center.',
      experienceYears: 10,
    },
    {
      id: 28,
      fullName: 'Omar Khaled',
      subject: 'SAT Math',
      subjects: ['SAT Math'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Private SAT tutor with flexible teaching style. Teaches online.',
      experienceYears: 9,
    },
    {
      id: 29,
      fullName: 'Dina Mostafa',
      subject: 'English',
      subjects: ['English'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'American curriculum English teacher. Teaches offline at a school in Alexandria.',
      experienceYears: 11,
    },
    {
      id: 30,
      fullName: 'Sherif Hany',
      subject: 'SAT English',
      subjects: ['SAT English'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Well-known SAT verbal instructor. Teaches online and from a test prep center.',
      experienceYears: 10,
    },
    {
      id: 31,
      fullName: 'Youssef Tarek',
      subject: 'Mathematics',
      subjects: ['Mathematics'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Math teacher in American division in Alexandria.',
      experienceYears: 10,
    },
    {
      id: 32,
      fullName: 'Rana Fathy',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'AP Biology tutor with good student feedback. Teaches online.',
      experienceYears: 8,
    },
    {
      id: 33,
      fullName: 'Tamer Naguib',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'AP Physics tutor known in student communities. Teaches from a center.',
      experienceYears: 12,
    },
    {
      id: 34,
      fullName: 'Hany Adel',
      subject: 'SAT Math',
      subjects: ['SAT Math'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Long-time SAT Math instructor. Teaches from a test prep center.',
      experienceYears: 11,
    },
    {
      id: 35,
      fullName: 'Mariam Atef',
      subject: 'English',
      subjects: ['English'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'English teacher in American schools in Alexandria.',
      experienceYears: 9,
    },
    {
      id: 36,
      fullName: 'George Samy',
      subject: 'Chemistry',
      subjects: ['Chemistry'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Chemistry teacher for American diploma in Alexandria.',
      experienceYears: 10,
    },
    {
      id: 37,
      fullName: 'Ahmed Reda',
      subject: 'SAT English',
      subjects: ['SAT English'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Focuses on SAT reading strategies. Teaches online.',
      experienceYears: 8,
    },
    {
      id: 38,
      fullName: 'Noha Samir',
      subject: 'Biology',
      subjects: ['Biology'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Biology teacher in American curriculum in Alexandria.',
      experienceYears: 10,
    },
    {
      id: 39,
      fullName: 'Wael Fawzy',
      subject: 'Mathematics',
      subjects: ['Mathematics'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'AP Math tutor with strong reputation. Teaches online.',
      experienceYears: 10,
    },
    {
      id: 40,
      fullName: 'Salma Hossam',
      subject: 'English',
      subjects: ['English'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Flexible English tutor for SAT and school support. Teaches online.',
      experienceYears: 7,
    },
    {
      id: 41,
      fullName: 'Khaled Farouk',
      subject: 'Physics',
      subjects: ['Physics'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Physics teacher in American schools in Alexandria.',
      experienceYears: 11,
    },
    {
      id: 42,
      fullName: 'Ehab Mansour',
      subject: 'Chemistry',
      subjects: ['Chemistry'],
      curriculum: 'American',
      email: '',
      phone: '',
      bio: 'Experienced AP Chemistry tutor. Teaches from a center.',
      experienceYears: 12,
    },
  ];

  private reviews: Review[] = [];

  private videos: VideoContent[] = [
    {
      id: 'v_math_1',
      teacherId: 1,
      title: 'Algebra Essentials: Equations & Inequalities',
      description: 'A complete refresher on solving equations with real exam-style examples.',
      durationSeconds: 38 * 60 + 12,
      priceCents: 0,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/5_6nsViVM00',
    },
    {
      id: 'v_math_2',
      teacherId: 1,
      title: 'Calculus: Derivatives (Full Lesson)',
      description: 'From limits to derivative rules with practice questions.',
      durationSeconds: 57 * 60 + 8,
      priceCents: 799,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/WUvTyaaNkzM',
    },
    {
      id: 'v_phy_1',
      teacherId: 2,
      title: "Newton's Laws: Master the Basics",
      description: 'Forces, free-body diagrams, and common mistakes.',
      durationSeconds: 44 * 60 + 35,
      priceCents: 499,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds',
    },
    {
      id: 'v_phy_2',
      teacherId: 2,
      title: 'Thermodynamics: Heat & Work',
      description: 'Understand the first law and solve typical problems.',
      durationSeconds: 31 * 60 + 9,
      priceCents: 0,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/9Vmwsg8Eabo',
    },
    {
      id: 'v_eng_1',
      teacherId: 3,
      title: 'Writing Better Essays: Structure & Style',
      description: 'Plan, draft, and polish essays with a simple rubric.',
      durationSeconds: 26 * 60 + 40,
      priceCents: 599,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/4G8n9E7vAzw',
    },
    {
      id: 'v_chem_1',
      teacherId: 4,
      title: 'Stoichiometry: Step-by-Step Problem Solving',
      description: 'Moles, ratios, and limiting reagents with exam-style questions.',
      durationSeconds: 41 * 60 + 5,
      priceCents: 0,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1532187863486-deab9a01b508?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/ANi709MYnW8',
    },
    {
      id: 'v_chem_2',
      teacherId: 4,
      title: 'Organic Chemistry: Functional Groups',
      description: 'Naming, patterns, and common reaction families.',
      durationSeconds: 52 * 60 + 18,
      priceCents: 899,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1603126857599-f6e314fa1d47?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/5uXGq5Hg4KI',
    },
    {
      id: 'v_cs_1',
      teacherId: 5,
      title: 'Python Fundamentals: Lists & Loops',
      description: 'Write clean code with patterns you can reuse in projects.',
      durationSeconds: 35 * 60 + 44,
      priceCents: 0,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
    },
    {
      id: 'v_cs_2',
      teacherId: 5,
      title: 'Data Structures: Big-O Intuition',
      description: 'Arrays, linked lists, and hash maps explained with examples.',
      durationSeconds: 48 * 60 + 2,
      priceCents: 699,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/8hly31xKli0',
    },
    {
      id: 'v_hist_1',
      teacherId: 6,
      title: 'Source Analysis for History Essays',
      description: 'How to read sources critically and build a strong thesis.',
      durationSeconds: 29 * 60 + 55,
      priceCents: 399,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/1X6FBWTL6w4',
    },
    {
      id: 'v_bio_1',
      teacherId: 7,
      title: 'Cell Structure & Function',
      description: 'Organelles, membranes, and transport — with diagrams.',
      durationSeconds: 33 * 60 + 12,
      priceCents: 0,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1530026405186-ed1f1393fa16?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/8Il7D7D8yrU',
    },
    {
      id: 'v_art_1',
      teacherId: 8,
      title: 'Digital Illustration: Light & Shadow',
      description: 'Simple exercises to improve form and readability in your pieces.',
      durationSeconds: 22 * 60 + 40,
      priceCents: 499,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/3j8ecF8Wt4E',
    },
    {
      id: 'v_music_1',
      teacherId: 9,
      title: 'Music Theory: Scales & Keys',
      description: 'Build fluency with major/minor keys and common progressions.',
      durationSeconds: 40 * 60 + 6,
      priceCents: 599,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/rgaTLrZGlkk',
    },
  ];

  getAll(): Teacher[] {
    return [...this.teachers];
  }

  getByCurriculum(curriculum: string): Teacher[] {
    return this.teachers.filter((t) => t.curriculum === curriculum);
  }

  getById(id: number): Teacher | undefined {
    return this.teachers.find((t) => t.id === id);
  }

  getReviewsForTeacher(teacherId: number): Review[] {
    return this.reviews
      .filter((r) => r.teacherId === teacherId)
      .sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
  }

  getVideosForTeacher(teacherId: number): VideoContent[] {
    return this.videos.filter((v) => v.teacherId === teacherId);
  }

  isVideoUnlocked(videoId: string): boolean {
    return this.getUnlockedVideoIds().includes(videoId);
  }

  unlockVideo(videoId: string): void {
    const current = new Set(this.getUnlockedVideoIds());
    current.add(videoId);
    localStorage.setItem(this.storageKey, JSON.stringify([...current]));
  }

  private getUnlockedVideoIds(): string[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter((x) => typeof x === 'string') as string[];
    } catch {
      return [];
    }
  }

  getAverageRating(teacherId: number): number {
    const rs = this.reviews.filter((r) => r.teacherId === teacherId);
    if (!rs.length) {
      return 0;
    }
    const sum = rs.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / rs.length) * 10) / 10;
  }

  create(teacher: Omit<Teacher, 'id'>): Teacher {
    const newId = this.teachers.length
      ? Math.max(...this.teachers.map((t) => t.id)) + 1
      : 1;
    const created: Teacher = { id: newId, ...teacher };
    this.teachers.push(created);
    return created;
  }

  update(id: number, changes: Partial<Omit<Teacher, 'id'>>): Teacher | undefined {
    const index = this.teachers.findIndex((t) => t.id === id);
    if (index === -1) {
      return undefined;
    }
    const updated: Teacher = { ...this.teachers[index], ...changes, id };
    this.teachers[index] = updated;
    return updated;
  }

  delete(id: number): void {
    this.teachers = this.teachers.filter((t) => t.id !== id);
  }
}

