import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly teacherService = new TeacherService();

  teacher?: Teacher;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      this.teacher = this.teacherService.getById(id);
    }
  }
}

