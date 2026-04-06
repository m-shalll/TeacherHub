import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { VideoContent } from '../../models/video';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent {
  private readonly i18n = inject(I18nService);

  @Input({ required: true }) video!: VideoContent;
  @Input({ required: true }) unlocked!: boolean;

  @Output() buy = new EventEmitter<string>();
  @Output() play = new EventEmitter<string>();

  get t() { return this.i18n.t(); }

  get isFree(): boolean {
    return this.video.priceCents === 0;
  }

  get durationLabel(): string {
    const total = Math.max(0, this.video.durationSeconds || 0);
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  get priceLabel(): string {
    if (this.video.priceCents === 0) {
      return this.t.video_free;
    }
    return `$${(this.video.priceCents / 100).toFixed(2)}`;
  }

  onPrimaryClick(): void {
    if (this.unlocked || this.isFree) {
      this.play.emit(this.video.id);
    } else {
      this.buy.emit(this.video.id);
    }
  }
}
