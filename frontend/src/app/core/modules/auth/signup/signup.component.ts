import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MustMatch } from '../../../services/validators/must-match.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public hide1 = true;
  public hide2 = true;

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  passwordRegx = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

  minDate = new Date();
  maxDate = new Date();


  public signupForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required],
    birthday: [null, Validators.required],
    password: [null, [Validators.required, Validators.pattern(this.passwordRegx)]],
    confirmPassword: [null, Validators.required],
    acceptTerms: [null, Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.maxDate.setFullYear(this.minDate.getFullYear() - 18);
    this.minDate.setFullYear(this.minDate.getFullYear() - 120);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public submit() {

  //   if(!this.signupForm?.valid) {
  //     this._snackBar.open('Please provide any values.', 'Close');
  //   } else {
  //   const email = this.signupForm.value.email;
  //   const password = this.signupForm.value.password;
  //   this.authenticationService
  //     .signup(email, password)
  //     .then((result) => {
  //       this.router.navigate(['']);
  //     })
  //     .catch((error) => {
  //       if (error.status >= 400 && error.status < 500) {
  //         this._snackBar.open('Error. Credentials are invalid!', 'Close');
  //       }
  //     });
  //   }
  }

}
