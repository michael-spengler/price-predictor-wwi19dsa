import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePW() {
    return 'You must enter a value';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public submit() {
    this.authenticationService
      .login(this.email.value, this.password.value)
      .then((result) => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        if (error.status >= 400 && error.status < 500) {
          this._snackBar.open('Error. Credentials are invalid!', 'Close');
        }
      });
  }
}
