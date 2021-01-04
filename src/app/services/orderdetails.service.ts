import { chOrderDetail } from '../entities/ch_orderdetail';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  orderDetails: chOrderDetail[];
  constructor(private http: HttpClient) { }


  getDetails(order_id): Observable<chOrderDetail[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.ordeDetailWithOrderId(order_id);
    return this.http.get<chOrderDetail[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.orderDetails = res;
        console.log(this.orderDetails);
        return this.orderDetails;
      })
    )
  }
}
