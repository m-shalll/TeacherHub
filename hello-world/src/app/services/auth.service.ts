import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

const SESSION_KEY = 'teacherhub.session.v1';
const ENROLLMENTS_KEY = 'teacherhub.enrollments.v1';
const TOKEN_KEY = 'teacherhub.token.v1';

interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  curriculum: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly currentEmail = signal<string | null>(this.readSessionEmail());
  readonly enrollmentVersion = signal(0);
  readonly isLoggedIn = computed(() => !!this.currentEmail());

  private readonly apiUrl = 'http://localhost:5264/api/auth';

  private readSessionEmail(): string | null {
    if (typeof sessionStorage === 'undefined') return null;
    return sessionStorage.getItem(SESSION_KEY);
  }

  getCurrentEmail(): string | null {
    return this.currentEmail();
  }

  getCurrentUser(): { email: string; fullName: string } | null {
    const email = this.currentEmail();
    const fullName = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('teacherhub.fullName.v1') : null;
    return email && fullName ? { email, fullName } : null;
  }

  getCurriculum(): string | null {
    return typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('teacherhub.curriculum.v1') : null;
  }

  async signup(fullName: string, email: string, password: string, curriculum: string): Promise<{ ok: true } | { ok: false; message: string }> {
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { fullName, email, password, curriculum })
      );
      this.setSession(res);
      return { ok: true };
    } catch (e: any) {
      const msg = e?.error?.message ?? 'Something went wrong.';
      return { ok: false, message: msg };
    }
  }

  async login(email: string, password: string): Promise<{ ok: true } | { ok: false; message: string }> {
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      );
      this.setSession(res);
      return { ok: true };
    } catch (e: any) {
      const msg = e?.error?.message ?? 'Something went wrong.';
      return { ok: false, message: msg };
    }
  }

  logout(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem('teacherhub.fullName.v1');
      sessionStorage.removeItem('teacherhub.curriculum.v1');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.currentEmail.set(null);
    this.router.navigate(['/']);
  }

  private setSession(res: AuthResponse): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, res.email);
      sessionStorage.setItem('teacherhub.fullName.v1', res.fullName);
      if (res.curriculum) sessionStorage.setItem('teacherhub.curriculum.v1', res.curriculum);
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, res.token);
    }
    this.currentEmail.set(res.email);
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /** Teacher IDs this student is enrolled with */
  getEnrolledTeacherIds(): number[] {
    const email = this.currentEmail();
    if (!email) return [];
    const map = this.readEnrollments();
    return map[email.toLowerCase()] ?? [];
  }

  enroll(teacherId: number): void {
    const email = this.currentEmail();
    if (!email) return;
    const key = email.toLowerCase();
    const map = this.readEnrollments();
    const set = new Set(map[key] ?? []);
    set.add(teacherId);
    map[key] = [...set];
    this.writeEnrollments(map);
    this.enrollmentVersion.update((v) => v + 1);
  }

  unenroll(teacherId: number): void {
    const email = this.currentEmail();
    if (!email) return;
    const key = email.toLowerCase();
    const map = this.readEnrollments();
    map[key] = (map[key] ?? []).filter((id) => id !== teacherId);
    this.writeEnrollments(map);
    this.enrollmentVersion.update((v) => v + 1);
  }

  isEnrolled(teacherId: number): boolean {
    return this.getEnrolledTeacherIds().includes(teacherId);
  }

  private readEnrollments(): Record<string, number[]> {
    try {
      const raw = localStorage.getItem(ENROLLMENTS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const out: Record<string, number[]> = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (Array.isArray(v)) {
          out[k] = v.filter((x): x is number => typeof x === 'number');
        }
      }
      return out;
    } catch {
      return {};
    }
  }

  private writeEnrollments(map: Record<string, number[]>): void {
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(map));
  }
}
