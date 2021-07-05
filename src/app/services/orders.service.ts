import { Order } from '../entities/order';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v3Api, query_body } from '../entities/v3api'
import { Customer } from '../entities/customer';
import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: Order[];
  customer: Customer;

  constructor(private http: HttpClient, private customerService: CustomersService) { }

  getOrderByStatus(status:string): Observable<Order[]> {
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
    req.projection = "";
    req.expression_values = values;

    req.projection = "";

    return this.http.post<Order[]>(v3Api.query, JSON.stringify(req), { headers: httpHeaders }).pipe(
      map((res) => {
        this.orders = res;

/*
        this.orders.forEach((obj: Order) => {
          obj.Customer = this.customerService.selectOneCustomer(obj.Customer.PK)
          return obj;
        })
*/

        return this.orders;
      })
    )
  }


  deleteOrder(orderId) {
    const ruta = Constants.orderWithId(orderId);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders });
  }
}
