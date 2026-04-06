# Project Folder Structure

```
hello-world/
├── public/                          # Static assets served as-is
├── src/
│   ├── index.html                   # Root HTML template; bootstraps the Angular app
│   ├── main.ts                      # Browser entry point; bootstraps AppComponent
│   ├── main.server.ts               # SSR entry point; bootstraps the app for server rendering
│   ├── server.ts                    # Express-based Node.js server for SSR
│   ├── styles.scss                  # Global CSS variables, resets, utility classes
│   │
│   └── app/
│       ├── app.component.ts         # Root component; imports Navbar and RouterOutlet
│       ├── app.component.html       # Root template — renders <app-navbar> + <router-outlet>
│       ├── app.component.scss       # Root component styles
│       ├── app.component.spec.ts    # Root component unit tests
│       │
│       ├── app.config.ts            # Angular app config (providers, HTTP client setup)
│       ├── app.config.server.ts     # Server-specific app config (SSR providers)
│       │
│       ├── app.routes.ts            # Route definitions; maps URLs to page components + guards
│       ├── app.routes.server.ts     # Server-side route configuration for SSR
│       │
│       ├── components/              # Reusable small UI components
│       │   ├── navbar/              # Top navigation bar (logo, links, conditional login/logout)
│       │   ├── rating-stars/        # Star rating display (read-only) for teacher reviews
│       │   ├── skeleton/            # Loading placeholder/skeleton animation
│       │   ├── teacher-card/        # Card showing a teacher's avatar, name, subject, rating
│       │   └── video-card/          # Card showing a video thumbnail, title, duration, unlock state
│       │
│       ├── guards/
│       │   ├── auth.guard.ts        # Blocks routes that require login; redirects to /login
│       │   └── reverse-auth.guard.ts # Redirects already-logged-in users away from login/signup
│       │
│       ├── models/                  # TypeScript interfaces / data shapes
│       │   ├── review.ts            # Student review: studentName, rating, text, date
│       │   ├── student-user.ts      # Student user profile fields
│       │   ├── teacher.ts           # Teacher profile: name, subjects, curriculum, bio, etc.
│       │   ├── timetable.ts         # Time schedule entry + weekly target per teacher
│       │   └── video.ts             # Video content: title, embedUrl, duration, pricing
│       │
│       ├── pages/                   # Full-page components (one per route)
│       │   ├── auth/
│       │   │   ├── login-page.      # Login form (email + password); calls AuthService.login
│       │   │   └── signup-page.     # Signup form (name, email, password, curriculum dropdown)
│       │   ├── home/
│       │   │   └── homepage.        # Landing page with hero + curriculum grid cards
│       │   ├── student-dashboard/
│       │   │   └── student-dashboard-page.
│       │   │                        # Logged-in student view: enrolled teachers, videos, progress
│       │   ├── teacher-profile/
│       │   │   └── teacher-profile-page.
│       │   │                        # Single teacher detail page: bio, reviews, videos, enroll
│       │   ├── teachers/
│       │   │   └── teachers-page.   # Browse/filter all teachers; curriculum filter support
│       │   └── timetable/
│       │       └── timetable-page.  # View/manage weekly schedule with teachers; set targets
│       │
│       ├── services/                # Data and business logic
│       │   ├── auth.service.ts      # Login/signup/logout via backend API + session storage
│       │   ├── teacher.service.ts   # In-memory store for teachers, reviews, videos + CRUD
│       │   └── timetable.service.ts # Per-user timetable entries & weekly targets (localStorage)
│       │
│       └── teachers/                # Teacher-specific sub-components (admin / CRUD)
│           ├── teacher-list.        # Lists all teachers with edit/delete actions
│           ├── teacher-detail.      # Full detail view of a single teacher (admin side)
│           └── teacher-form.        # Create/edit teacher form component
│
├── angular.json                     # Angular CLI build configuration
├── tsconfig.json / tsconfig.app.*   # TypeScript compiler configuration
├── package.json                     # Project dependencies and scripts
└── proxy.conf.json                  # Dev-server proxy config (forwards API calls to backend)
```

## Key Architectural Notes

- **No backend database** — the app uses in-memory data (in `TeacherService`) and browser `localStorage` for persistence
- **Authentication** hits a .NET backend at `localhost:5264/api/auth` for login/signup, but session state is kept in `sessionStorage` + `localStorage`
- **Standalone components** throughout — no NgModules used (Angular 17+ standalone API)
- **Data flow**: `TeacherService` provides mock data → Pages consume it → `components/` handle presentation
