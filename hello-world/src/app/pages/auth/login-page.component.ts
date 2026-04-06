import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(I18nService);

  email = '';
  password = '';
  error = '';

  get t() { return this.i18n.t(); }

  async submit(): Promise<void> {
    this.error = '';
    const result = await this.auth.login(this.email, this.password);
    if (!result.ok) {
      this.error = result.message;
      return;
    }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/timetable';
    this.router.navigateByUrl(returnUrl);
  }
}
