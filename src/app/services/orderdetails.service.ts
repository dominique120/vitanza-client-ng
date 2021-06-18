import { OrderDetail } from '../entities/orderdetail';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v3Api, query_body } from '../entities/v3api';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  orderDetails: OrderDetail[];
  constructor(private http: HttpClient) { }


  getDetails(order_id): Observable<OrderDetail[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    class expression_values {
      PK: string;
      odd: string;
    }

    let req = new query_body();
    let values = new expression_values();

    values.PK = order_id;
    values.odd = "ODD";

    req.expression = "PK = :PK and begins_with(SK, :odd)";
    req.key_name = "";
    req.expression_values = values;

    const url = v3Api.query;
    return this.http.post<OrderDetail[]>(url, JSON.stringify(req), { headers: httpHeaders }).pipe(
      map((res) => {
        this.orderDetails = res;
        return this.orderDetails;
      })
    )
  }
}
