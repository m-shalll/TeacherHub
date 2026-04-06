import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent {
  private readonly teacherService = new TeacherService();

  private readonly searchTerm = signal<string>('');
  private readonly teachers = signal<Teacher[]>(this.teacherService.getAll());

  readonly filteredTeachers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.teachers();
    }
    return this.teachers().filter((t) => {
      return (
        t.fullName.toLowerCase().includes(term) ||
        t.subject.toLowerCase().includes(term) ||
        (t.email && t.email.toLowerCase().includes(term))
      );
    });
  });

  setSearch(term: string): void {
    this.searchTerm.set(term);
  }

  removeTeacher(id: number): void {
    this.teacherService.delete(id);
    this.teachers.set(this.teacherService.getAll());
  }
}

