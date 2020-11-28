import { CustomersService } from './../../../services/customers.service';
import { Customer } from './../../../entities/customer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';


declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  newCust: any;

  constructor(private cust_svc: CustomersService) { }

  faEdit = faEdit;
  faTimes = faTimes;

  customerAgregarForm = new FormGroup({
    FirstName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
    LastNames: new FormControl()
  });

  customerActualizarForm = new FormGroup({
    ClientId_uuid: new FormControl(),
    FirstName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
    LastNames: new FormControl()
  });

  customerUpdated: Customer;

  ngOnInit(): void {
    this.getCustomers();
    console.log(this.customers);
  }

  mostrarFormularioAgregar(){
    $("#formulario-agregar").slideDown("slow");
  }

  cerrarFormularioAgregar(){
    $("#formulario-agregar").slideUp("slow");
  }

  addCustomer(values){
    console.log(values);

    let c: Customer = new Customer();

    c.FirstName = values.FirstName;
    c.PrimaryAddress = values.PrimaryAddress;
    c.PrimaryPhone = values.PrimaryPhone;
    c.SecondaryAddress = values.SecondaryAddress;
    c.SecondaryPhone = values.SecondaryPhone;
    c.District = values.District;
    c.LastNames = values.LastNames;

    this.cust_svc.insertCustomer(c).subscribe(
      (res) => {
        console.log(res)
        this.newCust = {
          ClientId_uuid : values.ClientId_uuid,
          FirstName : values.FirstName,
          PrimaryAddress : values.PrimaryAddress,
          PrimaryPhone : values.PrimaryPhone,
          SecondaryAddress : values.SecondaryAddress,
          SecondaryPhone : values.SecondaryPhone,
          District : values.District,
          LastNames : values.LastNames
        }
        this.customers.push(this.newCust);
        this.customerAgregarForm.reset();
        $("#formulario-agregar").slideUp("slow");
      }
    )
  }


  seleccionar(itemCustomer: Customer){
    console.log(itemCustomer);
    this.customerUpdated = itemCustomer;
    $("#formularioActualizar").modal('show');
  }

  eliminar(itemCustomer:Customer){
    var respuesta = confirm("Delete " + itemCustomer.FirstName + " " + itemCustomer.LastNames + "?");
    if (respuesta == true) {
      this.cust_svc.deleteCustomer(itemCustomer.ClientId_uuid).subscribe();
      this.customers = this.customers.filter(item => item.ClientId_uuid !== itemCustomer.ClientId_uuid);
      alert("Se ha eliminado: "  + itemCustomer.FirstName + " " + itemCustomer.LastNames);
    }
  }

  updateCustomer(values){
    console.log(values);

    let c: Customer = new Customer();

    c.ClientId_uuid = values.ClientId_uuid;
    c.FirstName = values.FirstName;
    c.PrimaryAddress = values.PrimaryAddress;
    c.PrimaryPhone = values.PrimaryPhone;
    c.SecondaryAddress = values.SecondaryAddress;
    c.SecondaryPhone = values.SecondaryPhone;
    c.District = values.District;
    c.LastNames = values.LastNames;


    this.cust_svc.updateCustomer(c).subscribe();
      alert("Updated: " + c.FirstName + " " + c.LastNames);
      $('#formulario-actualizar').modal('hide');
  }


  getCustomers(): void {
    this.cust_svc.selectCustomers().subscribe(
      (res: Customer[]) => {
        this.customers = res;
        console.log(this.customers);
      }
    );
  }

}
