import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TeacherService } from '../../services/teacher.service';
import { TeacherCardComponent } from '../../components/teacher-card/teacher-card.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-teachers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TeacherCardComponent, SkeletonComponent],
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss'],
  animations: [
    trigger('dropdownAnim', [
      state('void', style({ opacity: 0, transform: 'translateY(-8px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('* => void', animate('120ms cubic-bezier(0.4, 0, 0.2, 1)')),
    ]),
  ],
})
export class TeachersPageComponent implements OnInit, AfterViewInit {
  private readonly teacherService = inject(TeacherService);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly el = inject(ElementRef);
  private readonly doc = inject(DOCUMENT);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly i18n = inject(I18nService);

  @ViewChild('dropdownTrigger') private readonly dropdownTriggerEl?: ElementRef;
  @ViewChild('dropdownTpl') private readonly dropdownTpl?: TemplateRef<any>;

  readonly loading = signal(true);
  readonly search = signal('');
  readonly subjectFilter = signal<string>('all');
  readonly curriculumFilter = signal<string | null>(null);

  private readonly teachers = signal(this.teacherService.getAll());

  readonly subjectDropdownOpen = signal(false);

  private portalView: any = null;

  menuRect = { top: 0, left: 0, width: 220 };

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  constructor() {
    setTimeout(() => this.loading.set(false), 450);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const cur = params['curriculum'] ?? null;
      this.curriculumFilter.set(cur);
    });
  }

  readonly subjects = computed(() => {
    const set = new Set<string>();
    for (const t of this.teachers()) {
      for (const s of t.subjects?.length ? t.subjects : [t.subject || '']) {
        if (s) {
          set.add(s);
        }
      }
    }
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  });

  readonly curriculumLabel = computed(() => {
    const c = this.curriculumFilter();
    if (!c) return '';
    const t = this.i18n.t();
    return {
      Igcse: t.curr_igcse,
      American: t.curr_american,
      National: t.curr_national,
      Public: t.curr_public,
    }[c] ?? c;
  });

  readonly subjectsWithAll = computed(() => {
    const t = this.i18n.t();
    return this.subjects().map((s) => s === 'all' ? t.teachers_page_all_subjects : s);
  });

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const subject = this.subjectFilter();
    const curriculumOverride = this.curriculumFilter();
    const userCurriculum = this.auth.getCurriculum();
    const activeCurriculum = curriculumOverride || userCurriculum || null;

    return this.teachers().filter((t) => {
      if (activeCurriculum && t.curriculum !== activeCurriculum) return false;
      const subjects = (t.subjects?.length ? t.subjects : [t.subject || '']).filter(Boolean);
      const matchesText =
        !q ||
        t.fullName.toLowerCase().includes(q) ||
        subjects.some((s) => s.toLowerCase().includes(q)) ||
        (t.email || '').toLowerCase().includes(q);
      const matchesSubject = subject === 'all' || subjects.includes(subject);
      return matchesText && matchesSubject;
    });
  });

  isLoading(): boolean {
    return this.loading();
  }

  setSearch(value: string): void {
    this.search.set(value);
  }

  setSubject(value: string): void {
    this.subjectFilter.set(value);
    this.closeDropdown();
  }

  avgRatingFor(id: number): number {
    return this.teacherService.getAverageRating(id);
  }

  toggleDropdown(): void {
    if (this.subjectDropdownOpen()) {
      this.closeDropdown();
    } else {
      const rect = this.dropdownTriggerEl?.nativeElement.getBoundingClientRect();
      if (rect) {
        this.menuRect = { top: rect.bottom + 6, left: rect.left, width: rect.width };
      }
      this.subjectDropdownOpen.set(true);

      setTimeout(() => {
        if (this.dropdownTpl && !this.portalView) {
          this.portalView = this.viewContainer.createEmbeddedView(this.dropdownTpl);
          const domEl = this.portalView.rootNodes[0] as HTMLElement;
          domEl.style.position = 'fixed';
          domEl.style.top = this.menuRect.top + 'px';
          domEl.style.left = this.menuRect.left + 'px';
          domEl.style.width = this.menuRect.width + 'px';
          domEl.style.zIndex = '999999';
          this.doc.body.appendChild(domEl);
        }
      });
    }
  }

  closeDropdown(): void {
    this.subjectDropdownOpen.set(false);
    if (this.portalView) {
      this.viewContainer.remove(this.viewContainer.indexOf(this.portalView));
      this.portalView = null;
    }
  }

  get selectedLabel(): string {
    const s = this.subjectFilter();
    const t = this.i18n.t();
    return s === 'all' ? t.teachers_page_all_subjects : s;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.subjectDropdownOpen()) return;

    const portalOpen = this.doc.querySelector('.dropdown-portal');
    if (
      !this.el.nativeElement.contains(target) &&
      !(portalOpen instanceof HTMLElement && portalOpen.contains(target))
    ) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  handleEsc(): void {
    this.closeDropdown();
  }
}
