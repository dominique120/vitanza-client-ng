import { Customer } from '../entities/customer';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: Customer[];
  constructor(private http: HttpClient) { }

  selectCustomers(): Observable<Customer[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.customerUrl;
    return this.http.get<Customer[]>(ruta, { headers: httpHeaders})
    .pipe(
      map((response) => {
          this.customers = response;
          console.log(this.customers);
          return this.customers;
      })
    )
  }

  selectOneCustomer(customer_id): Observable<Customer[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.customerWithId(customer_id);

    return this.http.get<Customer[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.customers = res;
        return this.customers;
      })
    )
  }



  insertCustomer(customer: Customer) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.customerUrl;

    let reqbody = JSON.stringify(customer);

    return this.http.post(ruta, reqbody, { headers: httpHeaders }).pipe(
      map((res) => {
        return res;
      })
    )
  }

  updateCustomer(customer: Customer) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.customerWithId(customer.ClientId_uuid);

    let reqbody = JSON.stringify(customer);

    return this.http.put(ruta, reqbody, { headers: httpHeaders });
  }

  deleteCustomer(customer_id) {
    const ruta = Constants.customerWithId(customer_id);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }

  deactivateCustomer(customer_id) {
    const ruta = Constants.deactivateCustomerWithId(customer_id);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.post(ruta, { headers: httpHeaders});
  }
}
