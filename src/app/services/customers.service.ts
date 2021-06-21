import { Customer } from '../entities/customer';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { v3Api, query_body } from '../entities/v3api';
import { nanoid } from "nanoid"
import { Tools } from '../tools/tools';

@Injectable({
  providedIn: 'root'
})

export class CustomersService {
  customers: Customer[];
  customer: Customer;
  constructor(private http: HttpClient) { }

  getCustomersByStatus(status:string): Observable<Customer[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    class expression_values {
      status: string;
    }

    let req = new query_body();
    let values = new expression_values();

    values.status = status;

    req.expression = "GSI2PK = :status";
    req.key_name = "GSI2PK";
    req.expression_values = values;

    return this.http.post<Customer[]>(v3Api.query, JSON.stringify(req), { headers: httpHeaders }).pipe(
      map((res) => {
        this.customers = res;
        return this.customers;
      })
    )
  }

  selectOneCustomer(customer_id): Observable<Customer> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    const url = v3Api.get_item + "?SK=" + customer_id + "&PK=" + customer_id;

    return this.http.get<Customer>(url, { headers: httpHeaders }).pipe(
      map((res) => {
        this.customer = res;
        return this.customer;
      })
    )
  }

  insertCustomer(customer: Customer) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    let id = nanoid(12);
    customer.PK = "CLI#" + id;
    customer.SK = "CLI#" + id;
    customer.GSI2PK = "ACTIVE";
    customer.dateAdded = Tools.getDateTime();

    const ruta = v3Api.new_item;

    return this.http.post(ruta, JSON.stringify(customer), { headers: httpHeaders }).pipe(
      map((res) => {
        return res;
      })
    )
  }

  updateCustomer(customer: Customer) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    const ruta = Constants.customerWithId(customer.PK);

    let reqbody = JSON.stringify(customer);

    return this.http.put(ruta, reqbody, { headers: httpHeaders });
  }

  deleteCustomer(customer_id) {
    const ruta = Constants.customerWithId(customer_id);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }

  deactivateCustomer(customer_id) {
    const ruta = Constants.deactivateCustomerWithId(customer_id);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    return this.http.post(ruta, { headers: httpHeaders});
  }
}
