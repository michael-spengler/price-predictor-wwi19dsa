import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Trade } from '../../../shared/models/trade.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

function autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null;
    }
    return { 'invalidAutocompleteString': { value: control.value } };
  }
}


@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html',
  styleUrls: ['./new-trade.component.scss']
})
export class NewTradeComponent implements OnInit{

  public fiatOptions: string[] = ['Euro €', 'US-Dollar $'];
  public cryptoOptions: string[] = ['Bitcoin', 'Bitcoin Cash'];

  minDate = new Date();
  maxDate = new Date();
  //maxDate.setDate();// this.minDate   .setDate(date.getDate() + days);

  firstFormGroup: FormGroup = this.formBuilder1.group({
    sellOrBuy: ['', Validators.required]
  });
  secondFormGroup: FormGroup = this.formBuilder2.group({
    fiat: new FormControl('', [Validators.required, autocompleteStringValidator(this.fiatOptions)]),
    crypto: new FormControl('', [Validators.required, autocompleteStringValidator(this.cryptoOptions)]),
    percentReturn:  ['', Validators.required],
    motivation:  ['', Validators.required],
    percentInvest:  ['', Validators.required],
    startDate: ['', Validators.required], //new FormControl('', [Validators.required]),
    endDate: ['', Validators.required],
    description: ['', Validators.required] //new FormControl('', [Validators.required])
  });;
  thirdFormGroup: FormGroup = this.formBuilder3.group({
    acceptTerms: new FormControl('', [Validators.required])
  });;

  constructor(
    private formBuilder1: FormBuilder,
    private formBuilder2: FormBuilder,
    private formBuilder3: FormBuilder,
    private authService: AuthService,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() { 
    this.maxDate.setDate(this.minDate.getDate() + 5); 
  }


  public publishTrade() {

    const trade: Trade = {
      type: this.firstFormGroup.value.sellOrBuy,
      motivation: this.secondFormGroup.value.motivation,
      description: this.secondFormGroup.value.description,
      expectedIncrease: this.secondFormGroup.value.percentReturn,
      percent: this.secondFormGroup.value.percentInvest,
      startdate: this.secondFormGroup.value.startDate,
      enddate: this.secondFormGroup.value.endDate,
      fiatcurrency: this.secondFormGroup.value.fiat,
      cryptocurrency: this.secondFormGroup.value.crypto
    }
    console.log(trade);
    try {
      const token = this.authService.getToken();
    
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      let options = { headers: headers };
      
      this.httpClient.post(environment.apiEndpoint + 'trade', trade, options).subscribe(result => {
        this.router.navigate(['']);
        console.log("GEILOOO");
    }, error => {
        this._snackBar.open('Error. There are some troubles with this trade. Please try again!', 'Close');
  
    });
    }catch (e)
    {
      this._snackBar.open('Error. No authorization token found. Please login again!', 'Close');
    }
  }

  formatLabelPercent(value: number) {
    return value + '%';
  }

  formatLabelTime(value: number) {
    return value + 'W';
  }


  /** ====== Fiat-Auto ====== */
  //fiatControl = new FormControl();
  
  fiatFilteredOptions: Observable<string[]> = this.secondFormGroup.controls.fiat.valueChanges
  .pipe(
    startWith(''),
    map(value => this.fiatFilter(value))
  );

  private fiatFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.fiatOptions = ['Euro €', 'US-Dollar $'];
    return this.fiatOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  /** ====== Crypto-Auto ====== */
  //cryptoControl = new FormControl();
  //this.cryptoOptions = ['Bitcoin', 'Bitcoin Cash'];
  cryptoFilteredOptions: Observable<string[]> = this.secondFormGroup.controls.crypto.valueChanges
  .pipe(
    startWith(''),
    map(value => this.cryptoFilter(value))
  );

  private cryptoFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cryptoOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
