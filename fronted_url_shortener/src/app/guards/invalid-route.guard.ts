// guards/invalid-route.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InvalidRouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;

    // List of valid routes
    const validRoutes = ['/', '/home', '/login', '/profile'];

    if (!validRoutes.includes(url)) {
      // Invalid route, cancel navigation
      console.warn('Invalid route:', url);
      return false; // This prevents navigation
    }

    return true; // Allow navigation
  }
}
