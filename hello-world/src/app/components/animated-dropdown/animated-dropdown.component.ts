import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  OnInit,
  Output,
  signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-animated-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Trigger button -->
    <button
      type="button"
      #trigger
      class="animated-dropdown-trigger"
      [class.open]="isOpen()"
      (click)="toggle()"
      [attr.aria-expanded]="isOpen()"
    >
      <span class="animated-dropdown-label">
        <ng-container *ngIf="icon(); else defaultIcon">
          <span [innerHTML]="icon()"></span>
        </ng-container>
        <ng-template #defaultIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        </ng-template>
        {{ selectedLabel }}
      </span>
      <svg class="animated-dropdown-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    <!-- Hidden template for portal content -->
    <ng-template #dropdownTpl>
      <div class="animated-dropdown-portal" @dropdownAnim>
        <div class="animated-dropdown-menu">
          <button
            type="button"
            *ngFor="let opt of options()"
            class="animated-dropdown-item"
            [class.active]="value() === opt.value"
            (click)="select(opt.value)"
          >
            <span class="animated-dropdown-item-text">
              <svg *ngIf="value() === opt.value" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              {{ opt.label }}
            </span>
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    /* Trigger */
    .animated-dropdown-trigger {
      width: 100%;
      height: 100%;
      border-radius: 0.9rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.65rem 0.75rem;
      font-size: 0.9rem;
      background: rgba(255, 255, 255, 0.05);
      color: #e5e7eb;
      outline: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
      font-family: inherit;
    }

    .animated-dropdown-trigger:hover:not(.open) {
      border-color: rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.07);
    }

    .animated-dropdown-trigger.open {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }

    .animated-dropdown-label {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      color: #9ca3af;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .animated-dropdown-trigger.open .animated-dropdown-label {
      color: #e5e7eb;
    }

    .animated-dropdown-chevron {
      flex-shrink: 0;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animated-dropdown-trigger.open .animated-dropdown-chevron {
      transform: rotate(180deg);
    }

    /* Portal menu */
    .animated-dropdown-portal {
      position: fixed;
      z-index: 999999;
    }

    .animated-dropdown-menu {
      border-radius: 0.85rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #1e1b4b;
      backdrop-filter: blur(20px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
      overflow: hidden;
      max-height: 260px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
    }

    .animated-dropdown-item {
      width: 100%;
      border: none;
      background: transparent;
      padding: 0.6rem 0.85rem;
      color: #d1d5db;
      font-size: 0.9rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 120ms ease, color 120ms ease;
      font-family: inherit;
    }

    .animated-dropdown-item:first-child {
      padding-top: 0.7rem;
    }

    .animated-dropdown-item:last-child {
      padding-bottom: 0.7rem;
    }

    .animated-dropdown-item:hover {
      background: rgba(99, 102, 241, 0.12);
      color: #fff;
    }

    .animated-dropdown-item.active {
      background: rgba(99, 102, 241, 0.18);
      color: #a5b4fc;
      font-weight: 600;
    }

    .animated-dropdown-item-text {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],
  animations: [
    trigger('dropdownAnim', [
      state('void', style({ opacity: 0, transform: 'translateY(-8px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('* => void', animate('120ms cubic-bezier(0.4, 0, 0.2, 1)')),
    ]),
  ],
})
export class AnimatedDropdownComponent implements OnInit {
  private readonly doc = inject(DOCUMENT);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly el = inject(ElementRef);

  options = input.required<DropdownOption[]>();
  value = input<string>('');
  icon = input<string | undefined>();

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('trigger') private readonly triggerEl?: ElementRef;
  @ViewChild('dropdownTpl') private readonly dropdownTpl?: TemplateRef<any>;

  readonly isOpen = signal(false);

  private portalView: any = null;

  menuRect = { top: 0, left: 0, width: 220 };

  ngOnInit(): void {}

  get selectedLabel(): string {
    const val = this.value() ?? '';
    const found = this.options()?.find((o) => o.value === val);
    return found?.label ?? 'Select...';
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      const rect = this.triggerEl?.nativeElement.getBoundingClientRect();
      if (rect) {
        this.menuRect = { top: rect.bottom + 6, left: rect.left, width: rect.width };
      }
      this.isOpen.set(true);
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

  select(val: string): void {
    this.valueChange.emit(val);
    this.close();
  }

  close(): void {
    this.isOpen.set(false);
    if (this.portalView) {
      this.viewContainer.remove(this.viewContainer.indexOf(this.portalView));
      this.portalView = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!this.isOpen()) return;
    const portalEl = this.doc.querySelector('.animated-dropdown-portal');
    if (
      !this.el.nativeElement.contains(target) &&
      !(portalEl instanceof HTMLElement && portalEl.contains(target))
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  handleEsc(): void {
    this.close();
  }
}
