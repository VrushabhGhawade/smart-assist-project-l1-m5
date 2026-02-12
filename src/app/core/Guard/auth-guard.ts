import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PersistentAuthService } from '../services/persistent-auth';
import { UserRole } from '../models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(PersistentAuthService);
  const router = inject(Router);

  const allowedRoles = route.data?.['roles'] as UserRole[];
  if (authService.userDetails != null) {
    const userRole = authService.userDetails?.role;

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  } else {
    localStorage.clear();
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};