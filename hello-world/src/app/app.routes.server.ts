import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'teacher/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'teachers/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'teachers/:id/edit',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
