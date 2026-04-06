import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

const CURRICULA = ['Igcse', 'American', 'National', 'Public'] as const;

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);

  fullName = '';
  email = '';
  password = '';
  selectedCurriculum = signal<string>('');
  curriculumRequired = signal(false);
  error = '';

  curriculumOptions = CURRICULA;
  get t() { return this.i18n.t(); }

  get curriculumLabels(): Record<string, string> {
    const t = this.t;
    return {
      Igcse: t.curr_igcse,
      American: t.curr_american,
      National: t.curr_national,
      Public: t.curr_public,
    };
  }

  async submit(): Promise<void> {
    this.error = '';
    this.curriculumRequired.set(false);
    const curriculum = this.selectedCurriculum();
    if (!curriculum) {
      this.curriculumRequired.set(true);
      return;
    }
    const result = await this.auth.signup(this.fullName, this.email, this.password, curriculum);
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}
