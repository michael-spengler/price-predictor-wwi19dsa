import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { MustMatch } from '../../../shared/validators/must-match.validator';
import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';

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
    birthdate: [null, Validators.required],
    country: [null, Validators.required],
    password: [null, [Validators.required, Validators.pattern(this.passwordRegx)]],
    confirmPassword: [null, Validators.required],
    acceptTerms: [null, Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    const user: User = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      country: this.signupForm.value.country,
      password: this.signupForm.value.password,
      birthdate: this.signupForm.value.birthdate,
      zip: 2324234
    };
    
    this.userService.createUser(user).subscribe(result => {
        console.log(user.username);
        this.authService.login(user.email, user.password).subscribe(() => {
        
        if (this.authService.redirectUrl != "") {
          this.router.navigate([this.authService.redirectUrl]);
          this.authService.redirectUrl = "";
        }else {
          this.router.navigate(['/profile/' + user.username]);
        }
        });
    }, error => {
        this._snackBar.open('Error. There are some troubles with the signup!', 'Close');
    });
  }
}