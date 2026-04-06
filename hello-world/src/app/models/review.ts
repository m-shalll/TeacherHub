export interface Review {
  id: string;
  teacherId: number;
  studentName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  createdAtIso: string;
}

