import { Routes } from '@angular/router';
import { routesAuth } from './pages/auth/auth.routing';
import { routesAdmin } from './pages/admin/admin.routing';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: "auth", loadComponent: () => import('./pages/auth/auth.component'), children: routesAuth },
    { path: "admin", loadComponent: () => import('./pages/admin/admin.component'), children: routesAdmin }
];
