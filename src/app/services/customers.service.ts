import { Customer } from '../entities/customer';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    const ruta = Constants.base_url_port + "/customers";
    return this.http.get<Customer[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.customers = res;
        console.log(this.customers);
        return this.customers;
      })
    )
  }

  selectOneCustomer(customer_id): Observable<Customer[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.base_url_port + "/customers?id=" + customer_id;

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

    const ruta = Constants.base_url_port + "/customers";

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

    const ruta = Constants.base_url_port + "/customers?id=" + customer.ClientId_uuid;

    let reqbody = JSON.stringify(customer);

    return this.http.put(ruta, reqbody, { headers: httpHeaders });
  }

  deleteCustomer(customer_id) {
    const ruta = Constants.base_url_port + "/customers?id=" + customer_id;

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }
}
