import { OrdersService } from './../../../services/orders.service';
import { Order } from '../../../entities/order';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  newOrder: any;
  orderUpdated: Order;


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
    this.order_svc.getOrderByStatus("Closed").subscribe(
      (res: Order[]) => {
        this.orders = res;
      }
    );
  }

  seleccionar(itemOrder: Order){
    console.log(itemOrder);
    this.orderUpdated = itemOrder;
    $("#formularioActualizar").modal('show');
  }

  eliminar(itemOrder:Order){
    var respuesta = confirm("Delete " + itemOrder.PK + "?");
    if (respuesta == true) {
      this.order_svc.deleteOrder(itemOrder.PK).subscribe();
      this.orders = this.orders.filter(item => item.PK !== itemOrder.PK);
      alert("Se ha eliminado: "  + itemOrder.PK );
    }
  }

}
