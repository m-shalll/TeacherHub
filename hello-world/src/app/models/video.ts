export interface VideoContent {
  id: string;
  teacherId: number;
  title: string;
  description: string;
  durationSeconds: number;
  priceCents: number; // 0 means free
  thumbnailUrl?: string;
  /**
   * Placeholder embed url (YouTube, etc.) if available.
   * In a real backend, this would be a signed URL or stream manifest.
   */
  embedUrl?: string;
}

