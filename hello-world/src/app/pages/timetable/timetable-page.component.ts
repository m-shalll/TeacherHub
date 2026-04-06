import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Teacher } from '../../models/teacher';
import { TimetableEntry } from '../../models/timetable';
import { AuthService } from '../../services/auth.service';
import { TimetableService } from '../../services/timetable.service';
import { TeacherService } from '../../services/teacher.service';
import { I18nService } from '../../services/i18n.service';
import { AnimatedDropdownComponent, DropdownOption } from '../../components/animated-dropdown/animated-dropdown.component';

function dayLabels(i18n: I18nService): string[] {
  const t = i18n.t();
  return [t.tt_day_monday, t.tt_day_tuesday, t.tt_day_wednesday, t.tt_day_thursday, t.tt_day_friday, t.tt_day_saturday, t.tt_day_sunday];
}

function dayShortLabels(i18n: I18nService): string[] {
  const t = i18n.t();
  return [t.tt_day_short_mon, t.tt_day_short_tue, t.tt_day_short_wed, t.tt_day_short_thu, t.tt_day_short_fri, t.tt_day_short_sat, t.tt_day_short_sun];
}
const HOURS = Array.from({ length: 16 }, (_, i) => i + 7); // 7 to 22
const ACCENT_COLORS = [
  { bg: 'rgba(99, 102, 241, 0.35)', border: 'rgba(99, 102, 241, 0.6)', text: '#a5b4fc' },
  { bg: 'rgba(236, 72, 153, 0.35)', border: 'rgba(236, 72, 153, 0.6)', text: '#f9a8d4' },
  { bg: 'rgba(16, 185, 129, 0.35)', border: 'rgba(16, 185, 129, 0.6)', text: '#6ee7b7' },
  { bg: 'rgba(245, 158, 11, 0.35)', border: 'rgba(245, 158, 11, 0.6)', text: '#fcd34d' },
  { bg: 'rgba(6, 182, 212, 0.35)', border: 'rgba(6, 182, 212, 0.6)', text: '#67e8f9' },
  { bg: 'rgba(168, 85, 247, 0.35)', border: 'rgba(168, 85, 247, 0.6)', text: '#c4b5fd' },
];

@Component({
  selector: 'app-timetable-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AnimatedDropdownComponent],
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.scss'],
})
export class TimetablePageComponent {
  private readonly auth = inject(AuthService);
  private readonly timetable = inject(TimetableService);
  private readonly teacherService = inject(TeacherService);
  private readonly i18n = inject(I18nService);

  readonly HOURS = Array.from({ length: 16 }, (_, i) => i + 7);
  readonly dayIndices = [0, 1, 2, 3, 4, 5, 6];

  readonly DAYS = computed(() => dayLabels(this.i18n));
  readonly DAY_SHORT = computed(() => dayShortLabels(this.i18n));

  // Add form state
  addTeacherId = signal<string>('');
  addDay = signal(0);
  addStartTime = signal('09:00');
  addEndTime = signal('10:00');
  addError = signal('');
  addSuccess = signal('');

  get t() { return this.i18n.t(); }

  rawSelectedId = computed(() => {
    const raw = this.addTeacherId();
    return raw && !isNaN(Number(raw)) ? raw : '';
  });

  readonly teacherOptions = computed<DropdownOption[]>(() =>
    this.enrolledTeachers().map((t) => ({
      value: t.id.toString(),
      label: `${t.fullName} (${t.subjects[0]})`,
    }))
  );

  readonly dayOptions = computed<DropdownOption[]>(() =>
    this.DAY_SHORT().map((day, i) => ({ value: i.toString(), label: day }))
  );

  readonly teacherOptionsWithDefault = computed<DropdownOption[]>(() =>
    [{ value: '', label: this.t.tt_select_teacher }, ...this.teacherOptions()]
  );

  get dayDropdownValue(): string {
    return this.addDay().toString();
  }

  setDay(value: string): void {
    this.addDay.set(Number(value));
  }

  readonly enrolledTeachers = computed(() => {
    const ids = this.auth.getEnrolledTeacherIds();
    return ids
      .map((id) => this.teacherService.getById(id))
      .filter((t): t is Teacher => !!t);
  });

  readonly timetableEntries = computed(() => {
    return this.timetable.entries();
  });

  readonly teacherColors = computed(() => {
    const map = new Map<number, number>();
    let idx = 0;
    for (const t of this.enrolledTeachers()) {
      map.set(t.id, idx % ACCENT_COLORS.length);
      idx++;
    }
    return map;
  });

  readonly weeklyTargets = computed(() => this.timetable.weeklyTargets());

  getEnrolledTeacherById(id: number) {
    return this.teacherService.getById(id);
  }

  getTargetForTeacher(teacherId: number): number {
    const t = this.weeklyTargets().find((t) => t.teacherId === teacherId);
    return t?.count ?? 0;
  }

  getScheduledCount(teacherId: number): number {
    return this.timetable.getScheduledCount(teacherId);
  }

  isTargetFull(teacherId: number): boolean {
    const target = this.getTargetForTeacher(teacherId);
    return target > 0 && this.getScheduledCount(teacherId) >= target;
  }

  getColor(teacherId: number) {
    const map = this.teacherColors();
    const idx = map.get(teacherId) ?? 0;
    return ACCENT_COLORS[idx];
  }

  getInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  getEntriesForDayAndHour(day: number, hour: number) {
    return this.timetableEntries().filter((e) => {
      if (e.day !== day) return false;
      const startH = parseInt(e.startTime.split(':')[0], 10);
      const startM = parseInt(e.startTime.split(':')[1], 10);
      const endH = parseInt(e.endTime.split(':')[0], 10);
      const endM = parseInt(e.endTime.split(':')[1], 10);
      const slotStart = hour;
      const slotEnd = hour + 1;
      const entryStart = startH + startM / 60;
      const entryEnd = endH + endM / 60;
      return entryStart < slotEnd && entryEnd > slotStart;
    });
  }

  canAddAt(day: number, hour: number): boolean {
    return this.getEntriesForDayAndHour(day, hour).length === 0;
  }

  setTarget(teacherId: number, count: number): void {
    const scheduled = this.getScheduledCount(teacherId);
    if (count < scheduled) return;
    this.timetable.setWeeklyTarget(teacherId, count);
  }

  addSession(): void {
    this.addError.set('');
    this.addSuccess.set('');
    const raw = this.addTeacherId();
    if (!raw) {
      this.addError.set('Please select a teacher.');
      return;
    }
    const teacherId = +raw;
    const teacher = this.teacherService.getById(teacherId);
    if (!teacher) {
      this.addError.set('Teacher not found.');
      return;
    }
    const day = this.addDay();
    const start = this.addStartTime();
    const end = this.addEndTime();

    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    if (sh * 60 + sm >= eh * 60 + em) {
      this.addError.set('End time must be after start time.');
      return;
    }
    if (sh < 7 || eh > 22) {
      this.addError.set('Hours must be between 07:00 and 22:00.');
      return;
    }

    // Check weekly target limit
    const target = this.getTargetForTeacher(teacherId);
    if (target > 0 && this.getScheduledCount(teacherId) >= target) {
      this.addError.set('You have reached your weekly target of ' + target + ' session(s) for this teacher.');
      return;
    }

    // Check for conflicts
    const conflicts = this.timetableEntries().some(
      (e) =>
        e.day === day &&
        this.timeOverlap(start, end, e.startTime, e.endTime)
    );
    if (conflicts) {
      this.addError.set('This slot overlaps with an existing session.');
      return;
    }

    this.timetable.addEntry(teacherId, teacher.fullName, day, start, end);
    this.addSuccess.set('Session added!');
    setTimeout(() => this.addSuccess.set(''), 2500);
    this.addTeacherId.set('');
    this.addDay.set(0);
    this.addStartTime.set('09:00');
    this.addEndTime.set('10:00');
  }

  private timeOverlap(s1: string, e1: string, s2: string, e2: string): boolean {
    const toMin = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    return toMin(s1) < toMin(e2) && toMin(e1) > toMin(s2);
  }

  removeEntry(id: string): void {
    this.timetable.removeEntry(id);
  }

  getProgressPercent(scheduled: number, target: number): number {
    return target === 0 ? 0 : Math.min((scheduled / target) * 100, 100);
  }

  padHour(hour: number): string {
    return hour.toString().padStart(2, '0');
  }

  hasEntryAt(day: number, hour: number): boolean {
    return this.getEntriesForDayAndHour(day, hour).length > 0;
  }

  entryCountAt(day: number, hour: number): number {
    return this.getEntriesForDayAndHour(day, hour).length;
  }

  entryStartsAt(entry: TimetableEntry, hour: number): boolean {
    const startH = parseInt(entry.startTime.split(':')[0], 10);
    return startH === hour;
  }

  // Visible entries for a cell: only entries that start at this hour (span from there)
  getVisibleEntries(day: number, hour: number): TimetableEntry[] {
    return this.getEntriesForDayAndHour(day, hour).filter((e) => this.entryStartsAt(e, hour));
  }

  spanHours(entry: TimetableEntry): number {
    const [sh, sm] = entry.startTime.split(':').map(Number);
    const [eh, em] = entry.endTime.split(':').map(Number);
    const diffMinutes = (eh * 60 + em) - (sh * 60 + sm);
    return Math.ceil(diffMinutes / 60);
  }

  // Used for cells where an entry passes through but doesn't start (to avoid duplication)
  hasPassThrough(day: number, hour: number): boolean {
    const entries = this.getEntriesForDayAndHour(day, hour);
    return entries.some((e) => !this.entryStartsAt(e, hour));
  }

  // Map hour to grid column index (grid has 1 day-label col + 16 hour cols)
  // Hour 7 => col 2, Hour 8 => col 3, etc.
  entryGridColumn(entry: TimetableEntry, currentHour: number): number {
    return currentHour - 5;
  }

  // Day index to grid row (row 1 = headers, so day 0 = row 2)
  entryGridRow(di: number): number {
    return di + 2;
  }

  trackByTeacher(index: number, item: Teacher): number {
    return item.id;
  }

  trackByEntryId(index: number, item: TimetableEntry): string {
    return item.id;
  }
}
