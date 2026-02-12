import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { AuthLayout } from './features/layouts/auth-layout/auth-layout';
import { MainLayout } from './features/layouts/main-layout/main-layout';
import { Resource } from './features/user-manual/resource/resource';
import { TechnicalDetailsLearnt } from './features/user-manual/technical-details-learnt/technical-details-learnt';
import { UserManual } from './features/user-manual/user-manual/user-manual';
import { userRoutes } from './features/user/user.routes';
import { authGuard } from './core/Guard/auth-guard';
import { supportEngineerRoutes } from './features/support-engineer/support-engineer.routes';
import { supervisorRoutes } from './features/supervisor/supervisor.routes';
import { UserRole } from './core/models/user.model';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Login },
            { path: 'user-manual', component: UserManual },
            { path: 'technical-details-learnt', component: TechnicalDetailsLearnt },
            { path: 'resource', component: Resource },
        ]
    },
   {
  path: '',
  component: MainLayout,
  children: [
    // Requirement 4: Use route guards for role-based access control
   {
      path: 'supervisor',
      // Requirement 5: Use route data to specify allowed roles for each route
      children: supervisorRoutes, canActivate: [authGuard],
      //
      data: { roles: [UserRole.SUPERVISOR] }   
    },
     {
      path: 'support',
      children: supportEngineerRoutes, canActivate: [authGuard],
      data: { roles: [UserRole.SUPPORT_ENGINEER] } 
    },
    {
      path: 'user',
      children: userRoutes, canActivate: [authGuard],
      data: { roles: [UserRole.END_USER] }   
    }
  ]
}

];

