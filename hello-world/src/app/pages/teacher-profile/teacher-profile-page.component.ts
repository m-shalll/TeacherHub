import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TeacherService } from '../../services/teacher.service';
import { RatingStarsComponent } from '../../components/rating-stars/rating-stars.component';
import { VideoCardComponent } from '../../components/video-card/video-card.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { Teacher } from '../../models/teacher';
import { Review } from '../../models/review';
import { VideoContent } from '../../models/video';
import { AuthService } from '../../services/auth.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-teacher-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule, RatingStarsComponent, VideoCardComponent, SkeletonComponent],
  templateUrl: './teacher-profile-page.component.html',
  styleUrls: ['./teacher-profile-page.component.scss'],
})
export class TeacherProfilePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly teacherService = inject(TeacherService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly auth = inject(AuthService);
  readonly i18n = inject(I18nService);
  get t() { return this.i18n.t(); }

  private readonly loading = signal(true);
  teacher?: Teacher;
  reviews: Review[] = [];
  videos: VideoContent[] = [];

  selectedVideoId = signal<string | null>(null);

  readonly avgRating = computed(() => (this.teacher ? this.teacherService.getAverageRating(this.teacher.id) : 0));

  readonly enrolled = computed(() => {
    this.auth.enrollmentVersion();
    return this.teacher ? this.auth.isEnrolled(this.teacher.id) : false;
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      // Simulated loading for skeleton UI
      setTimeout(() => {
        this.teacher = this.teacherService.getById(id);
        if (this.teacher) {
          this.reviews = this.teacherService.getReviewsForTeacher(id);
          this.videos = this.teacherService.getVideosForTeacher(id);
        }
        this.loading.set(false);
      }, 450);
    } else {
      this.loading.set(false);
    }
  }

  isLoading(): boolean {
    return this.loading();
  }

  subjectsLabel(): string {
    if (!this.teacher) return '';
    const subjects = (this.teacher.subjects?.length ? this.teacher.subjects : [this.teacher.subject || '']).filter(Boolean);
    return subjects.join(' • ');
  }

  unlocked(videoId: string): boolean {
    return this.teacherService.isVideoUnlocked(videoId);
  }

  onBuy(videoId: string): void {
    // Mock purchase: immediately unlock.
    this.teacherService.unlockVideo(videoId);
  }

  onPlay(videoId: string): void {
    this.selectedVideoId.set(videoId);
  }

  selectedVideo(): VideoContent | undefined {
    const id = this.selectedVideoId();
    return id ? this.videos.find((v) => v.id === id) : undefined;
  }

  safeEmbedUrl(url?: string): SafeResourceUrl | undefined {
    if (!url) return undefined;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  enrollOrLogin(): void {
    if (!this.teacher) {
      return;
    }
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.auth.enroll(this.teacher.id);
  }

  unenroll(): void {
    if (!this.teacher) {
      return;
    }
    this.auth.unenroll(this.teacher.id);
  }
}

