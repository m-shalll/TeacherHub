import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
})
export class TeacherFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly teacherService = new TeacherService();

  mode: 'create' | 'edit' = 'create';
  teacherId?: number;

  model: Partial<Teacher> = {
    fullName: '',
    subject: '',
    email: '',
    phone: '',
    bio: '',
    experienceYears: undefined,
  };

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.mode = 'edit';
      this.teacherId = Number(idParam);
      const existing = this.teacherService.getById(this.teacherId);
      if (existing) {
        this.model = { ...existing };
      }
    }
  }

  save(): void {
    if (!this.model.fullName || !this.model.subject) {
      return;
    }

    if (this.mode === 'create') {
      const created = this.teacherService.create({
        fullName: this.model.fullName!,
        subject: this.model.subject!,
        email: this.model.email || '',
        phone: this.model.phone,
        bio: this.model.bio,
        experienceYears: this.model.experienceYears,
      });
      this.router.navigate(['/teachers', created.id]);
    } else if (this.mode === 'edit' && this.teacherId != null) {
      const updated = this.teacherService.update(this.teacherId, this.model);
      if (updated) {
        this.router.navigate(['/teachers', updated.id]);
      }
    }
  }
}

