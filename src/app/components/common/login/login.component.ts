import { Observable } from 'rxjs';
import { User } from './../../../entities/user';
import { Auth } from './../../../entities/auth';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from "@angular/router";
import { from } from 'rxjs';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { promise } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  verificarLogin(values: User) {
    console.log(values)
    this.loginService.signin(values)
      .subscribe(
        res => {
          console.log(res);
          const a = res;
          console.log(a);

          let f = new Auth();
          Object.assign(f, res);
          console.log(f);
          localStorage.setItem("jwt", f.jwt);
          localStorage.setItem("usuario_activo",f.jwt);

          alert("Welcome");
          window.location.href = "/";

        })
  }

  cerrarSesion() {
    this.loginService.logout();
    window.location.href = "/";
  }
}
