import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardContent implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }


    public canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            console.log("Hier");
            return true;
        } else {
            const username = this.authService.getUsername();
            this.router.navigate(['profile/' + username]);
            console.log("Dort");
            return false;
        }
    }

}
