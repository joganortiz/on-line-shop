import { Routes } from '@angular/router';
import { routesAuth } from './pages/auth/auth.routing';
import { routesAdmin } from './pages/admin/admin.routing';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { 
        path: "auth", 
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent), 
        children: routesAuth 
    },
    { 
        path: "admin", 
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent), 
        children: routesAdmin, 
        title: "admin",
    },
    { path: '**', redirectTo: '/auth', pathMatch: 'full'}
];
