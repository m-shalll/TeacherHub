import { Injectable, inject, Signal, computed, signal } from '@angular/core';
import { TimetableEntry, WeeklyTarget } from '../models/timetable';
import { AuthService } from './auth.service';

const TIMETABLE_KEY = 'teacherhub.timetable.v1';
const TARGETS_KEY = 'teacherhub.targets.v1';

@Injectable({ providedIn: 'root' })
export class TimetableService {
  private readonly auth = inject(AuthService);
  private readonly _entries = signal<TimetableEntry[]>(this.readEntries());
  private readonly _targets = signal<WeeklyTarget[]>(this.readTargets());

  readonly entries: Signal<TimetableEntry[]> = computed(() => this._entries());
  readonly weeklyTargets: Signal<WeeklyTarget[]> = computed(() => this._targets());

  getScheduledCount(teacherId: number): number {
    return this._entries().filter((e) => e.teacherId === teacherId).length;
  }

  setWeeklyTarget(teacherId: number, count: number): void {
    const email = this.auth.getCurrentEmail();
    if (!email) return;
    const targets = this._targets();
    const idx = targets.findIndex((t) => t.teacherId === teacherId);
    let updated: WeeklyTarget[];
    if (idx >= 0) {
      updated = [...targets];
      updated[idx] = { teacherId, count };
    } else {
      updated = [...targets, { teacherId, count }];
    }
    this._targets.set(updated);
    this.writeTargets(updated);
  }

  addEntry(teacherId: number, teacherName: string, day: number, startTime: string, endTime: string): void {
    const entry: TimetableEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      teacherId,
      teacherName,
      day,
      startTime,
      endTime,
    };
    const updated = [...this._entries(), entry];
    this._entries.set(updated);
    this.writeEntries(updated);
  }

  removeEntry(id: string): void {
    const updated = this._entries().filter((e) => e.id !== id);
    this._entries.set(updated);
    this.writeEntries(updated);
  }

  private readEntries(): TimetableEntry[] {
    const email = this.auth.getCurrentEmail();
    if (!email) return [];
    try {
      const raw = localStorage.getItem(TIMETABLE_KEY);
      if (!raw) return [];
      const map = JSON.parse(raw) as Record<string, unknown>;
      const entries = map[email.toLowerCase()];
      return Array.isArray(entries) ? (entries as TimetableEntry[]) : [];
    } catch {
      return [];
    }
  }

  private writeEntries(entries: TimetableEntry[]): void {
    const email = this.auth.getCurrentEmail();
    if (!email) return;
    try {
      const raw = localStorage.getItem(TIMETABLE_KEY);
      const map: Record<string, unknown> = raw ? JSON.parse(raw) : {};
      map[email.toLowerCase()] = entries;
      localStorage.setItem(TIMETABLE_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  }

  private readTargets(): WeeklyTarget[] {
    const email = this.auth.getCurrentEmail();
    if (!email) return [];
    try {
      const raw = localStorage.getItem(TARGETS_KEY);
      if (!raw) return [];
      const map = JSON.parse(raw) as Record<string, unknown>;
      const targets = map[email.toLowerCase()];
      return Array.isArray(targets) ? (targets as WeeklyTarget[]) : [];
    } catch {
      return [];
    }
  }

  private writeTargets(targets: WeeklyTarget[]): void {
    const email = this.auth.getCurrentEmail();
    if (!email) return;
    try {
      const raw = localStorage.getItem(TARGETS_KEY);
      const map: Record<string, unknown> = raw ? JSON.parse(raw) : {};
      map[email.toLowerCase()] = targets;
      localStorage.setItem(TARGETS_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  }
}
