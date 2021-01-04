import { chProduct } from '../entities/ch_product';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: chProduct[];
  constructor(private http: HttpClient) { }

  selectProducts(): Observable<chProduct[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.productUrl;
    return this.http.get<chProduct[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.products = res;
        console.log(this.products);
        return this.products;
      })
    )
  }

  deleteProducts(productId) {
    const ruta = Constants.productWithId(productId);

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }
}
