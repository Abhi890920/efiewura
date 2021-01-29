import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams  } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { map, catchError, mapTo, tap,share  } from "rxjs/operators";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  databaseObj: SQLiteObject;
  database_name: string = "efiwura_datatable.db";
  table_name: string = "logged_in_users";
  constructor(public http: HttpClient,private sqlite: SQLite) { }
  
  	postData(data,url):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      };
      const body = new HttpParams()
    .set('data_json', data);

      //console.log(body.toString())
      return this.http.post(environment.apiUrl+url,body.toString(),httpOptions).pipe(
        tap(res => res),
        catchError(error => {
          this.handleError(url,[])
          return of(false);
        }));
    }

    getData(url):Observable<any>{
      return this.http.get(environment.apiUrl+url).pipe(
        map((res: any) => res),
        catchError(this.handleError(url,[])));
    }
    createDB() {
      this.sqlite.create({
        name: this.database_name,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;
          console.log(this.databaseObj)
          //alert('freaky_datatable Database Created!');
        })
        .catch(e => {
          console.log(JSON.stringify(e))
          //alert("error " + JSON.stringify(e))
        });
    }


    private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {
	   
	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead
	   
	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
  	}
}
