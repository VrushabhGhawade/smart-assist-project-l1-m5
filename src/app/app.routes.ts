import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { User } from './features/user/user';
import { SupportEngineer } from './features/support-engineer/support-engineer';
import { Admin } from './features/admin/admin';
import { MainLayout } from './features/layouts/main-layout/main-layout';
import { AuthLayout } from './features/layouts/auth-layout/auth-layout';
import { About } from './features/about/about';

export const routes: Routes = [

    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Login },
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: 'user', component: User },
            { path: 'support', component: SupportEngineer },
            { path: 'admin', component: Admin }
        ]
    },
    { path: 'about', component: About }

];
