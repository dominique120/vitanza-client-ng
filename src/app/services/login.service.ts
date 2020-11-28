import { User } from './../entities/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Constants } from '../entities/Constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public signin(user: User){
    const ruta = Constants.base_url_port + "/auth";
    const body = JSON.stringify(user);
    return this.http.post<Response>(ruta, body);
  }

  public isLoggedIn(){
    return localStorage.getItem("usuario_activo") !== null;
  }

  public logout(){
    localStorage.removeItem("usuario_activo");
    localStorage.removeItem("jwt");
  }
}
