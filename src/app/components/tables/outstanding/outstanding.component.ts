import { OrderDetail } from './../../../entities/orderdetail';
import { OrderdetailsService } from './../../../services/orderdetails.service';
import { OrdersService } from './../../../services/orders.service';
import { Order } from './../../../entities/order';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {faEdit, faTimes, faInfo} from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-outstanding',
  templateUrl: './outstanding.component.html',
  styleUrls: ['./outstanding.component.css']
})
export class OutstandingComponent implements OnInit {
  orders: Order[];
  newOrder: any;
  orderUpdated: Order;

  orderdetails: OrderDetail[];


  faEdit = faEdit;
  faTimes = faTimes;
  faInfo = faInfo;
  constructor(private order_svc: OrdersService, private details_svc: OrderdetailsService) { }

  ngOnInit(): void {
    this.getOutstanding();
  }

  getOutstanding(): void {
    this.order_svc.getOutstanding().subscribe(
      (res: Order[]) => {
        this.orders = res;
      }
    );
  }


  getDetails(orderid): void {
    this.details_svc.getDetails(orderid).subscribe(
      (res: OrderDetail[]) => {
        this.orderdetails = res;
      }
    );
    $("#formularioActualizar").modal('show');
  }

}
