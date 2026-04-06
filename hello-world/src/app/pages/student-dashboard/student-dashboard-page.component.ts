import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TeacherService } from '../../services/teacher.service';
import { TeacherCardComponent } from '../../components/teacher-card/teacher-card.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-student-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TeacherCardComponent],
  templateUrl: './student-dashboard-page.component.html',
  styleUrls: ['./student-dashboard-page.component.scss'],
})
export class StudentDashboardPageComponent {
  private readonly auth = inject(AuthService);
  private readonly teacherService = inject(TeacherService);
  readonly i18n = inject(I18nService);

  get t() { return this.i18n.t(); }

  readonly user = computed(() => this.auth.getCurrentUser());

  readonly enrolledTeachers = computed(() => {
    this.auth.enrollmentVersion();
    const ids = new Set(this.auth.getEnrolledTeacherIds());
    return this.teacherService.getAll().filter((t) => ids.has(t.id));
  });

  unenroll(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.auth.unenroll(id);
  }

  avgRatingFor(id: number): number {
    return this.teacherService.getAverageRating(id);
  }
}
