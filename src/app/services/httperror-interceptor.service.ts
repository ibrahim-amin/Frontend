import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, of, retryWhen,concatMap, throwError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
  constructor(private _toaster:ToastrService) { }
  intercept (request: HttpRequest<any>, next: HttpHandler){
    console.log('Http Request Started');

    return next.handle(request).pipe(
          retryWhen(error =>  this.retryRequest(error,10)),
            // error.pipe(
            //   concatMap((checkErr:HttpErrorResponse,count:number)=>{
            //     if(checkErr.status===0 && count<10){
            //       return of(checkErr);
            //     }
            //     return throwError(checkErr);
            // })
         // )),
      catchError((error:HttpErrorResponse)=>{
       let errorMessage= this.setError(error);
        console.log(errorMessage);
        this._toaster.error(errorMessage);
        return throwError(errorMessage);
      })
    );

  }

  setError(error : HttpErrorResponse): string{
      let errorMessage='';
      if(error.error instanceof ErrorEvent){
        errorMessage = error.error.message;
      }
      else if (error.status===401){
        return errorMessage='Un Authorized, please login first';
      }
      else if(error.status !==0){
        errorMessage= error.error;
      }
      else{
        errorMessage="Unknow Error Occured";
      }

      return errorMessage;
  }

  retryRequest(error:Observable<unknown>,retrycount:number):Observable<unknown>{

    return error.pipe(
      concatMap((checkErr:HttpErrorResponse,count:number)=>{
        if(checkErr.status===0 && count<retrycount){
          return of(checkErr);
        }
        return throwError(checkErr);
    })
    )

  }

}
