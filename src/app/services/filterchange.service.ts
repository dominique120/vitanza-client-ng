import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v3Api, query_body } from '../entities/v3api'
import { Filter_change } from '../entities/filter_change';

@Injectable({
  providedIn: 'root'
})
export class FilterchangeService {
  constructor(private http: HttpClient) { }

  filterChanges: Filter_change[];

  getChangesByStatusAndDate(status:string, startDate:string, endDate:string): Observable<Filter_change[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    class expression_values {
      status: string;
      start: string;
      end: string;
    }

    let req = new query_body();
    let values = new expression_values();

    values.status = status;
    //values.start = startDate;
    //values.end = endDate;

    //req.expression = "GSI1PK = :status AND GSI1SK BETWEEN :start AND :end";
    req.expression = "GSI1PK = :status";
    req.key_name = "GSI1PK";
    req.expression_values = values;

    return this.http.post<Filter_change[]>(v3Api.query, JSON.stringify(req), { headers: httpHeaders }).pipe(
      map((res) => {
        this.filterChanges = res;
        return this.filterChanges;
      })
    )
  }


}
