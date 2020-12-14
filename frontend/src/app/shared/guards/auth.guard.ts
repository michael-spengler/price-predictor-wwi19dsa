import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    public canActivate(): boolean {
        try {
            console.log(this.authService.isAuthenticated())
            if (this.authService.isAuthenticated()) {
                return true;
            } else {
                return this.fallback();
            }
        } catch (e) {
            console.log(e);
            return this.fallback();
        }
    }

    private fallback(): boolean {
        this.router.navigate(['/auth']);
        return false;
    }

}
