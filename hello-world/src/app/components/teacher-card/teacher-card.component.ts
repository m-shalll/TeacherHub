import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Teacher } from '../../models/teacher';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingStarsComponent],
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss'],
})
export class TeacherCardComponent {
  private readonly i18n = inject(I18nService);

  @Input({ required: true }) teacher!: Teacher;
  @Input() averageRating = 0;

  get t() { return this.i18n.t(); }

  subjectsLabel(): string {
    const subjects = (this.teacher.subjects?.length
      ? this.teacher.subjects
      : [this.teacher.subject || '']
    ).filter((s) => !!s);
    return subjects.join(' • ');
  }
}
