import { Routes } from '@angular/router';
import { routesAuth } from './pages/auth/auth.routing';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: "auth", component: AuthComponent, children: routesAuth }
];
