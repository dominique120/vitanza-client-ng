import { OrderDetail } from '../../../entities/orderdetail';
import { OrderdetailsService } from '../../../services/orderdetails.service';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../entities/order';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/entities/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { Tools } from "../../../tools/tools"

declare var $: any;

@Component({
  selector: 'app-outstanding',
  templateUrl: './outstanding.component.html',
  styleUrls: ['./outstanding.component.css']
})

export class OutstandingComponent implements OnInit {
  orders: Order[];
  customer: Customer;
  newOrder: any;
  orderUpdated: Order;
  runningTotal:number = 0;

  orderdetails: OrderDetail[];

  faEdit = faEdit;
  faTimes = faTimes;
  faInfo = faInfo;

  constructor(private order_svc: OrdersService,
    private details_svc: OrderdetailsService,
    private customer_svc: CustomersService) { }

  ngOnInit(): void {
    this.getOutstanding();
  }

  getOutstanding(): void {
    this.order_svc.getOrderByStatus("P_PAY").subscribe(
      (res: Order[]) => {
        this.orders = res;
      }
    );
  }

  getDetails(orderId): void {
    this.details_svc.getDetails(orderId).subscribe(
      (res: OrderDetail[]) => {
        this.orderdetails = res;

        this.orderdetails.forEach(element => {
          this.runningTotal = this.runningTotal + element.oPrice * element.Qty;
        });
      }
    );
    $("#detailsModal").modal('show');
  }


  getCustomer(customerId): void {
    this.customer_svc.selectOneCustomer(customerId).subscribe(
      (res: Customer) => {
        this.customer = res;
      }
    );
    $("#ordersCustomerModal").modal('show');
  }

}
