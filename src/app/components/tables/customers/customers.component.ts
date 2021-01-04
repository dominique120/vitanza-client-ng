import { CustomersService } from './../../../services/customers.service';
import { Customer } from './../../../entities/customer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  reverse: boolean = false;
  customerFilter: any = {LastNames: ''}
  customerOrder: string = "LastNames"
  pageNumber: number = 1

  customers: Customer[];
  newCust: any;

  activeOptions: any = [ 1, 0];
  interstOptions: any = [ "Filters", "Chemicals", "Filters and Chemicals"]

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
    LastNames: new FormControl(),
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Active: new FormControl()
  });

  customerActualizarForm = new FormGroup({
    ClientId_uuid: new FormControl(),
    FirstName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
    LastNames: new FormControl(),
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Active: new FormControl()
  });

  customerUpdated: Customer;

  ngOnInit(): void {
    this.getCustomers();
    console.log(this.customers);
  }

  setOrder(value: string){
    if(this.customerOrder === value){
        this.reverse = !this.reverse;
    }
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
    c.Notes = values.Notes;
    c.Intrest = values.Intrest;
    c.Active = values.Active;

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
          LastNames : values.LastNames,
          Intrest : values.Intrest,
          Notes : values.Notes,
          Active : values.Active
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
    var respuesta = confirm("Are you sure you wish to delete " + itemCustomer.FirstName + " " + itemCustomer.LastNames + " (This will remove all asociated information)?");
    if (respuesta == true) {
      this.cust_svc.deleteCustomer(itemCustomer.ClientId_uuid).subscribe();
      this.customers = this.customers.filter(item => item.ClientId_uuid !== itemCustomer.ClientId_uuid);
      alert("You have removed: "  + itemCustomer.FirstName + " " + itemCustomer.LastNames + " from the registry.");
    }
  }

  deactivate(itemCustomer:Customer){
    var respuesta = confirm("Are you sure you wish to deactivate " + itemCustomer.FirstName + " " + itemCustomer.LastNames + "?");
    if (respuesta == true) {
      this.cust_svc.deactivateCustomer(itemCustomer.ClientId_uuid).subscribe();
      this.customers = this.customers.filter(item => item.ClientId_uuid !== itemCustomer.ClientId_uuid);
      alert(itemCustomer.FirstName + " " + itemCustomer.LastNames + " has been de-activated.");
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
    c.Intrest = values.Intrest;
    c.Notes = values.Notes;
    c.Active = values.Active;


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
