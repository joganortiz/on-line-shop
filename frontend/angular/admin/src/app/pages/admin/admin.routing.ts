import { Routes } from '@angular/router';

export const routesAdmin: Routes = [
    { path: "", loadComponent: () => import('./dashboard/dashboard.component') },
    // { path: "users/roles", loadComponent: () => import('./roles/roles.component') },
    // { path: "users", loadComponent: () => import('./users/users.component') },
    { path: '**', redirectTo: '/admin', pathMatch: 'full'}
];
