import { Product } from '../entities/product';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];
  constructor(private http: HttpClient) { }


  selectProducts(): Observable<Product[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    const ruta = Constants.base_url_port + "/products";
    return this.http.get<Product[]>(ruta, { headers: httpHeaders }).pipe(
      map((res) => {
        this.products = res;
        console.log(this.products);
        return this.products;
      })
    )
  }



  deleteProducts(productId) {
    const ruta = Constants.base_url_port + "/products?id=" + productId;

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem("jwt")
    });

    return this.http.delete(ruta, { headers: httpHeaders});
  }
}
