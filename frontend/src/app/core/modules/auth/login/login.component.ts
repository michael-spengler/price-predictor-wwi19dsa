import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  public hide = true;
  public loginForm: FormGroup | undefined;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public submit() {

    if(!this.loginForm?.valid) {
      this._snackBar.open('Please provide vaild values.', 'Close');
    } else {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authenticationService
      .login(email, password)
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
}
