import { Product } from '../entities/product';
import { Constants } from '../entities/Constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query_body, v3Api } from '../entities/v3api';
import { nanoid } from 'nanoid';
import { Tools } from '../tools/tools';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];
  product: Product;
  constructor(private http: HttpClient) { }

  getProcutsByType(type: string): Observable<Product[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    class expression_values {
      gsi: string;
      pro: string;
    }

    let req = new query_body();
    let values = new expression_values();

    values.gsi = status;
    values.pro = "PRO";

    req.expression = "GSI1PK = :gsi and begins_with(GSI1SK, :pro)";
    req.key_name = "GSI1PK";
    req.expression_values = values;

    req.projection = "PK, Name, Description, BasePrice, Stock";

    return this.http.post<Product[]>(v3Api.query, JSON.stringify(req), { headers: httpHeaders }).pipe(
      map((res) => {
        this.products = res;
        return this.products;
      })
    )
  }

  selectOneProduct(product_id, type): Observable<Product> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    const url = v3Api.get_item + "?SK=" + type + "&PK=" + product_id;

    return this.http.get<Product>(url, { headers: httpHeaders }).pipe(
      map((res) => {
        this.product = res;
        return this.product;
      })
    )
  }


  insertProduct(product: Product): number {
    let statusCode: number = 0;
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    let id = nanoid(12);
    product.PK = "PRO|" + id;
    product.GSI1SK = "PRO|" + id;

    product.DateAdded = Tools.getDateTime();

    const ruta = v3Api.new_item;

    this.http.post(ruta, JSON.stringify(product), { headers: httpHeaders, observe: 'response' }).subscribe(response => {
      statusCode = response.status;
    });

    return statusCode;
  }


}
