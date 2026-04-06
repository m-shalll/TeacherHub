export interface TimetableEntry {
  id: string;
  teacherId: number;
  teacherName: string;
  day: number; // 0=Mon, ..., 6=Sun
  startTime: string; // "HH:MM" (24h)
  endTime: string; // "HH:MM" (24h)
}

export interface WeeklyTarget {
  teacherId: number;
  count: number;
}