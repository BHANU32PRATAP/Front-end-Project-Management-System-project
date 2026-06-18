import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router)

  const userRole = JSON.parse(localStorage.getItem("userData") || "{}")

  const allowedRoleBased = route.data['roles']

  if (allowedRoleBased.includes(userRole.role)) {
    return true;
  }

return router.createUrlTree(["/dashboard"])


};
