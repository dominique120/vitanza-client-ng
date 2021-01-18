import { OrdersService } from './../../../services/orders.service';
import { chOrder } from '../../../entities/order';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: chOrder[];
  newOrder: any;
  orderUpdated: chOrder;


  faEdit = faEdit;
  faTimes = faTimes;
  constructor(private order_svc: OrdersService) { }


  ordersAgregarForm = new FormGroup({
    FirstName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
    LastNames: new FormControl()
  });

  ordersActualizarForm = new FormGroup({
    ClientId_uuid: new FormControl(),
    FirstName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
    LastNames: new FormControl()
  });


  ngOnInit(): void {
    this.getOrders();
  }

  mostrarFormularioAgregar(){
    $("#formulario-agregar").slideDown("slow");
  }

  cerrarFormularioAgregar(){
    $("#formulario-agregar").slideUp("slow");
  }

  getOrders(): void {
    this.order_svc.selectOrders().subscribe(
      (res: chOrder[]) => {
        this.orders = res;
      }
    );
  }



  seleccionar(itemOrder: chOrder){
    console.log(itemOrder);
    this.orderUpdated = itemOrder;
    $("#formularioActualizar").modal('show');
  }

  eliminar(itemOrder:chOrder){
    var respuesta = confirm("Delete " + itemOrder.OrderId_uuid + "?");
    if (respuesta == true) {
      this.order_svc.deleteOrder(itemOrder.OrderId_uuid).subscribe();
      this.orders = this.orders.filter(item => item.OrderId_uuid !== itemOrder.OrderId_uuid);
      alert("Se ha eliminado: "  + itemOrder.OrderId_uuid );
    }
  }

}
