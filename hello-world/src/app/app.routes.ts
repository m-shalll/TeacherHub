import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { redirectIfLoggedInGuard } from './guards/reverse-auth.guard';
import { HomepageComponent } from './pages/home/homepage.component';
import { LoginPageComponent } from './pages/auth/login-page.component';
import { SignupPageComponent } from './pages/auth/signup-page.component';
import { StudentDashboardPageComponent } from './pages/student-dashboard/student-dashboard-page.component';
import { TeachersPageComponent } from './pages/teachers/teachers-page.component';
import { TeacherProfilePageComponent } from './pages/teacher-profile/teacher-profile-page.component';
import { TimetablePageComponent } from './pages/timetable/timetable-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent, canActivate: [redirectIfLoggedInGuard] },

  { path: 'login', component: LoginPageComponent, canActivate: [redirectIfLoggedInGuard] },
  { path: 'signup', component: SignupPageComponent, canActivate: [redirectIfLoggedInGuard] },
  { path: 'dashboard', component: StudentDashboardPageComponent, canActivate: [authGuard] },
  { path: 'timetable', component: TimetablePageComponent, canActivate: [authGuard] },

  { path: 'teachers', component: TeachersPageComponent },
  { path: 'teacher/:id', component: TeacherProfilePageComponent },

  { path: 'teachers/:id', redirectTo: 'teacher/:id' },
  { path: 'teachers/new', redirectTo: 'teachers' },
  { path: 'teachers/:id/edit', redirectTo: 'teacher/:id' },

  { path: '**', redirectTo: '' },
];
