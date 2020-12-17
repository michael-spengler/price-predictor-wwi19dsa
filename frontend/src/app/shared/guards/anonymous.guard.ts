import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    public canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
