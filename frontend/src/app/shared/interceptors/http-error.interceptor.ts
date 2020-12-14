import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error && error.error.status !== 403) {
                    if (error.error instanceof ErrorEvent) {
                        // client-side/network error
                        this.openSnackBar("Network Error");
                    } else {
                        // unsuccessful respond code from server
                        this.openSnackBar('Connection Error');
                    }
                }
                return throwError(error);
            })
        );
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, "Close", {
          duration: 2000,
          panelClass: 'error',
        });
    }
}