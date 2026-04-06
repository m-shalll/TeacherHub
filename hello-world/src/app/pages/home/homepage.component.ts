import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

const CURRICULA = (t: ReturnType<typeof getComputedTranslations>) => [
  { key: 'Public', name: t.curr_public, icon: '👨‍👩‍👧‍👦', description: t.curr_public_desc },
  { key: 'National', name: t.curr_national, flag: 'eg', description: t.curr_national_desc },
  { key: 'Igcse', name: t.curr_igcse, flag: 'gb', description: t.curr_igcse_desc },
  { key: 'American', name: t.curr_american, flag: 'us', description: t.curr_american_desc },
];

function getComputedTranslations(i18n: I18nService) {
  return i18n.t();
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  private readonly teacherService = inject(TeacherService);
  readonly auth = inject(AuthService);
  readonly i18n = inject(I18nService);

  get t() {
    return this.i18n.t();
  }

  get curricula() {
    return CURRICULA(this.t);
  }

  teacherCount(curriculum: string): number {
    return this.teacherService.getByCurriculum(curriculum).length;
  }

  trackByC(_index: number, item: { key: string }): string {
    return item.key;
  }
}
