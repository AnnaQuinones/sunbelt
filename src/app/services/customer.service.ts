import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8090/customer', data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          errorMessage = error.error?.message || errorMessage;
        }
        return throwError(error);
      })
    );
  }
}
