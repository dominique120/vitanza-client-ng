import { OrderDetail } from '../../../entities/orderdetail';
import { OrderdetailsService } from '../../../services/orderdetails.service';
import { OrdersService } from '../../../services/orders.service';
import { Order } from '../../../entities/order';
import { Component, OnInit } from '@angular/core';
import { faEdit, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/entities/customer';
import { CustomersService } from 'src/app/services/customers.service';

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


  getDate():string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    console.log("Current date: " + dd + '/' + mm + '/' + yyyy)

    return dd + '/' + mm + '/' + yyyy;
  }

  getNextMonth():string {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if (Number(mm) == 11){
      mm = "1"
      yyyy = yyyy + 1
    } else {
      mm = String(Number(mm) + 1).padStart(2, "0")
    }

    console.log("Next date: " + dd + '/' + mm + '/' + yyyy)

    return dd + '/' + mm + '/' + yyyy;
  }

}
