import { Routes } from '@angular/router';

export const routesAdmin: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: "dashboard", loadComponent: () => import('./dashboard/dashboard.component') },
    { path: "roles", loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent) },
    // { path: "users", loadComponent: () => import('./users/users.component') },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];
