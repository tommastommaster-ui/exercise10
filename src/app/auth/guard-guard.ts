import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginApi } from '../api.service';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(LoginApi);

  if(auth.token()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
