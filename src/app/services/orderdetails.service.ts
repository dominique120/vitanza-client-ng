import { OrderDetail } from './../entities/orderdetail';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  orderDetails: OrderDetail[];
  constructor(private http: HttpClient) { }


  getDetails(order_id): Observable<OrderDetail[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.base_url_port + "/orderdetails/by_order?id=" + order_id;
    return this.http.get<OrderDetail[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.orderDetails = res;
        console.log(this.orderDetails);
        return this.orderDetails;
      })
    )
  }
}
