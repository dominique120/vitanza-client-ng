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
    FullName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Active: new FormControl()
  });

  customerActualizarForm = new FormGroup({
    ClientId_uuid: new FormControl(),
    FullName: new FormControl(),
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(),
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

    c.GSI1PK = values.FullName;
    c.Address1 = values.PrimaryAddress;
    c.Phone1 = values.PrimaryPhone;
    c.Address2 = values.SecondaryAddress;
    c.Phone2 = values.SecondaryPhone;
    c.GSI1SK = values.District;
    c.Notes = values.Notes;
    c.Intrest = values.Intrest;
    c.GSI2PK = values.Active;

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
    var respuesta = confirm("Are you sure you wish to delete " + itemCustomer.GSI1PK + " (This will remove all asociated information)?");
    if (respuesta == true) {
      this.cust_svc.deleteCustomer(itemCustomer.PK).subscribe();
      this.customers = this.customers.filter(item => item.PK !== itemCustomer.PK);
      alert("You have removed: "  + itemCustomer.GSI1PK + " " + itemCustomer.GSI1PK + " from the registry.");
    }
  }

  deactivate(itemCustomer:Customer){
    var respuesta = confirm("Are you sure you wish to deactivate " + itemCustomer.GSI1PK + "?");
    if (respuesta == true) {
      this.cust_svc.deactivateCustomer(itemCustomer.PK).subscribe();
      this.customers = this.customers.filter(item => item.PK !== itemCustomer.PK);
      alert(itemCustomer.GSI1PK + " has been de-activated.");
    }
  }

  updateCustomer(values){
    console.log(values);

    let c: Customer = new Customer();

    c.PK = values.ClientId_uuid;
    c.SK = values.ClientId_uuid;
    c.GSI1PK = values.FirstName;
    c.Address1 = values.PrimaryAddress;
    c.Phone1 = values.PrimaryPhone;
    c.Address2 = values.SecondaryAddress;
    c.Phone2 = values.SecondaryPhone;
    c.GSI1SK = values.District;
    c.Intrest = values.Intrest;
    c.Notes = values.Notes;
    c.GSI2PK = values.Active;


    this.cust_svc.updateCustomer(c).subscribe();
      alert("Updated: " + c.GSI1PK);
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
