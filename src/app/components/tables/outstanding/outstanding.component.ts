import { chOrderDetail } from '../../../entities/ch_orderdetail';
import { OrderdetailsService } from './../../../services/orderdetails.service';
import { OrdersService } from './../../../services/orders.service';
import { chOrder } from '../../../entities/ch_order';
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
  orders: chOrder[];
  newOrder: any;
  orderUpdated: chOrder;

  orderdetails: chOrderDetail[];


  faEdit = faEdit;
  faTimes = faTimes;
  faInfo = faInfo;
  constructor(private order_svc: OrdersService, private details_svc: OrderdetailsService) { }

  ngOnInit(): void {
    this.getOutstanding();
  }

  getOutstanding(): void {
    this.order_svc.getOutstanding().subscribe(
      (res: chOrder[]) => {
        this.orders = res;
      }
    );
  }


  getDetails(orderid): void {
    this.details_svc.getDetails(orderid).subscribe(
      (res: chOrderDetail[]) => {
        this.orderdetails = res;
      }
    );
    $("#formularioActualizar").modal('show');
  }

}
