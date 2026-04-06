import { Injectable, computed, inject, signal } from '@angular/core';
import { translations, TranslationKeys, type Locale } from '../i18n/translations';

const STORAGE_KEY = 'teacherhub.locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly _locale = signal<Locale>(this.load());

  readonly locale = this._locale.asReadonly();
  readonly isRTL = signal(this._locale() === 'ar');

  t = computed(() => translations[this._locale()]);

  setLocale(locale: Locale): void {
    localStorage.setItem(STORAGE_KEY, locale);
    this._locale.set(locale);
    this.isRTL.set(locale === 'ar');
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }

  toggle(): void {
    this.setLocale(this._locale() === 'en' ? 'ar' : 'en');
  }

  private load(): Locale {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw === 'ar' ? 'ar' : 'en';
    } catch {
      return 'en';
    }
  }
}
