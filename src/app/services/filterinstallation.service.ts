import { Injectable } from '@angular/core';
import { Filter_installation } from '../entities/filter_installation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v3Api, query_body } from '../entities/v3api'

@Injectable({
  providedIn: 'root'
})
export class FilterinstallationService {

  constructor(private http: HttpClient) { }

  filterInstallation:Filter_installation;

  selectOneFilterInstallaiton(customer_id, filterId): Observable<Filter_installation> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    const url = v3Api.get_item + "?SK=" + filterId + "&PK=" + customer_id;

    return this.http.get<Filter_installation>(url, { headers: httpHeaders }).pipe(
      map((res) => {
        this.filterInstallation = res;
        return this.filterInstallation;
      })
    )
  }
}
