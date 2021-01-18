import { chOrder } from '../entities/order';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: chOrder[];
  constructor(private http: HttpClient) { }


  selectOrders(): Observable<chOrder[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.orderUrl;
    return this.http.get<chOrder[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.orders = res;
        console.log(this.orders);
        return this.orders;
      })
    )
  }


  getOutstanding(): Observable<chOrder[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.outstandingOrdersUrl;
    return this.http.get<chOrder[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.orders = res;
        console.log(this.orders);
        return this.orders;
      })
    )
  }



  deleteOrder(orderId) {
    const ruta = Constants.orderWithId(orderId);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }
}
