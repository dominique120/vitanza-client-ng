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
  customerFilter: any = {GSI1PK: ''}
  customerOrder: string = "Names"
  pageNumber: number = 1

  customers: Customer[];
  newCustomer: any;

  interstOptions: any = [ "Filters", "Chemicals", "Filters and Chemicals"]
  districtOptions: any = [ "Cercado de Lima", "Ate", "Barranco", "Breña", "Comas", "Chorrillos", "El Agustino", "Jesús María", "La Molina", "La Victoria", "Lince", "Magdalena del Mar", "Miraflores", "Pueblo Libre", "Puente Piedra", "Rimac", "San Isidro", "Independencia", "San Juan de Miraflores", "San Luis", "San Martin de Porres", "San Miguel", "Santiago de Surco", "Surquillo", "Villa María del Triunfo", "San Juan de Lurigancho", "Santa Rosa", "Los Olivos", "San Borja", "Villa El Savador", "Santa Anita", "Cercado Callao", "Bellavista", "Carmen de la Legua", "La Perla", "La Punta", "Ventanilla" ]


  constructor(private customer_svc: CustomersService) { }

  faEdit = faEdit;
  faTimes = faTimes;

  AddCustomerForm = new FormGroup({
    FullName: new FormControl(), // GSI1PK
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(), // GSI1SK
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Email: new FormControl(),
    inCharge: new FormControl()
  });

  customerActualizarForm = new FormGroup({
    FullName: new FormControl(), // GSI1PK
    PrimaryAddress: new FormControl(),
    PrimaryPhone: new FormControl(),
    SecondaryAddress: new FormControl(),
    SecondaryPhone: new FormControl(),
    District: new FormControl(), // GSI1SK
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Email: new FormControl(),
    InCharge: new FormControl(),
    Active: new FormControl()
  });

  customerUpdated: Customer;

  ngOnInit(): void {
    this.getCustomers();
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

  addCustomer(formValues){
    console.log(formValues);

    let newCustomer: Customer = new Customer();

    newCustomer.GSI1PK    =   formValues.FullName;
    newCustomer.GSI1SK    =   formValues.District;
    newCustomer.Address1  =   formValues.PrimaryAddress;
    newCustomer.Address2  =   formValues.SecondaryAddress;
    newCustomer.Phone1    =   formValues.PrimaryPhone;
    newCustomer.Phone2    =   formValues.SecondaryPhone;
    newCustomer.Intrest   =   formValues.Intrest;
    newCustomer.Notes     =   formValues.Notes;
    newCustomer.Email     =   formValues.Email;
    newCustomer.inCharge  =   formValues.inCharge;

    this.customer_svc.insertCustomer(newCustomer).subscribe(
      (res) => {
        console.log(res)
        this.newCustomer = {
          GSI1PK    :  formValues.FullName,
          GSI1SK    :  formValues.District,
          Address1  :  formValues.Address1,
          Address2  :  formValues.Address2,
          Phone1    :  formValues.Phone1,
          Phone2    :  formValues.Phone2,
          Intrest   :  formValues.Intrest,
          Notes     :  formValues.Notes,
          Email     :  formValues.Email,
          inCharge  :  formValues.inCharge
        }

        this.customers.push(this.newCustomer);

        this.AddCustomerForm.reset();

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
      this.customer_svc.deleteCustomer(itemCustomer.PK).subscribe();
      this.customers = this.customers.filter(item => item.PK !== itemCustomer.PK);
      alert("You have removed: "  + itemCustomer.GSI1PK + " " + itemCustomer.GSI1PK + " from the registry.");
    }
  }

  deactivate(itemCustomer:Customer){
    var respuesta = confirm("Are you sure you wish to deactivate " + itemCustomer.GSI1PK + "?");
    if (respuesta == true) {
      this.customer_svc.deactivateCustomer(itemCustomer.PK).subscribe();
      this.customers = this.customers.filter(item => item.PK !== itemCustomer.PK);
      alert(itemCustomer.GSI1PK + " has been de-activated.");
    }
  }

  updateCustomer(values){
    console.log(values);

    let c: Customer = new Customer();

    c.PK = values.ClientId_uuid;
    c.SK = values.ClientId_uuid;
    c.GSI1PK = values.FullName;
    c.Address1 = values.PrimaryAddress;
    c.Phone1 = values.PrimaryPhone;
    c.Address2 = values.SecondaryAddress;
    c.Phone2 = values.SecondaryPhone;
    c.GSI1SK = values.District;
    c.Intrest = values.Intrest;
    c.Notes = values.Notes;
    c.GSI2PK = values.Active;


    this.customer_svc.updateCustomer(c).subscribe();
      alert("Updated: " + c.GSI1PK);
      $('#formulario-actualizar').modal('hide');
  }


  getCustomers() {
    this.customer_svc.getCustomersByStatus("ACTIVE").subscribe(
      (res: Customer[]) => {
        this.customers = res;
      }
    );
  }

}
