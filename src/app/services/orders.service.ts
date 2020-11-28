import { Order } from '../entities/order';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Order[];
  constructor(private http: HttpClient) { }


  selectOrders(): Observable<Order[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.base_url_port + "/orders";
    return this.http.get<Order[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.orders = res;
        console.log(this.orders);
        return this.orders;
      })
    )
  }


  getOutstanding(): Observable<Order[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.base_url_port + "/orders/outstanding";
    return this.http.get<Order[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.orders = res;
        console.log(this.orders);
        return this.orders;
      })
    )
  }



  deleteOrder(orderId) {
    const ruta = Constants.base_url_port + "/orders?id=" + orderId;

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }
}
