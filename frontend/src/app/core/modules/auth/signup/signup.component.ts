import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms'; //FormControl,
//import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public hide = true;
  public signupForm: FormGroup | undefined;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private _snackBar: MatSnackBar,
    //private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.signupForm = this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
    //   password: [null, Validators.required]
    // });
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
