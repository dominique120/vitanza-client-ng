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
  customerFilter: any = { GSI1PK: '' }
  customerOrder: string = "GSI1PK"
  pageNumber: number = 1

  customers: Customer[];
  newCustomer: any;

  interstOptions: any = ["Filters", "Chemicals", "Filters and Chemicals"]
  districtOptions: any = ["Cercado de Lima", "Ate", "Barranco", "Breña", "Comas", "Chorrillos", "El Agustino", "Jesús María", "La Molina", "La Victoria", "Lince", "Magdalena del Mar", "Miraflores", "Pueblo Libre", "Puente Piedra", "Rimac", "San Isidro", "Independencia", "San Juan de Miraflores", "San Luis", "San Martin de Porres", "San Miguel", "Santiago de Surco", "Surquillo", "Villa María del Triunfo", "San Juan de Lurigancho", "Santa Rosa", "Los Olivos", "San Borja", "Villa El Savador", "Santa Anita", "Cercado Callao", "Bellavista", "Carmen de la Legua", "La Perla", "La Punta", "Ventanilla"]
  statusOptions: any = ["ACTIVE", "DEACTIVATED"]

  constructor(private customer_svc: CustomersService) { }

  faEdit = faEdit;
  faTimes = faTimes;

  AddCustomerForm = new FormGroup({
    GSI1PK: new FormControl(), // Names
    Address1: new FormControl(),
    Phone1: new FormControl(),
    Address2: new FormControl(),
    Phone2: new FormControl(),
    GSI1SK: new FormControl(), // District
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Email: new FormControl(),
    InCharge: new FormControl()
  });

  UpdateCustomerForm = new FormGroup({
    PK: new FormControl(), // ID
    GSI1PK: new FormControl(), // Names
    Address1: new FormControl(),
    Phone1: new FormControl(),
    Address2: new FormControl(),
    Phone2: new FormControl(),
    GSI1SK: new FormControl(), // District
    Intrest: new FormControl(),
    Notes: new FormControl(),
    Email: new FormControl(),
    InCharge: new FormControl(),
    GSI2PK: new FormControl(), // status
    DateAdded: new FormControl(),
    DateChanged: new FormControl()
  });

  customerUpdated: Customer;

  ngOnInit(): void {
    this.getCustomers();
  }

  setOrder(value: string) {
    if (this.customerOrder === value) {
      this.reverse = !this.reverse;
    }
  }

  showAdditionForm() {
    $("#addition-form").slideDown("slow");
  }

  closeAdditionForm() {
    $("#addition-form").slideUp("slow");
  }

  addCustomer(formValues) {
    let newCustomer: Customer = new Customer();

    newCustomer.GSI1PK = formValues.GSI1PK; // names
    newCustomer.GSI1SK = formValues.GSI1SK; // district
    newCustomer.Address1 = formValues.Address1;
    newCustomer.Address2 = formValues.Address2;
    newCustomer.Phone1 = formValues.Phone1;
    newCustomer.Phone2 = formValues.Phone2;
    newCustomer.Intrest = formValues.Intrest;
    newCustomer.Notes = formValues.Notes;
    newCustomer.Email = formValues.Email;
    newCustomer.InCharge = formValues.InCharge;

    let statusCode = this.customer_svc.insertCustomer(newCustomer)

    if (statusCode = 201) {
      this.customers.push(this.newCustomer);
      this.AddCustomerForm.reset();
      $("#addition-form").slideUp("slow");
      alert("Added customer: " + newCustomer.GSI1PK);
    } else {
      alert(newCustomer.GSI1PK + " was not added!! \n\nError code: " + statusCode);
    }

  }

  seleccionar(customerId) {
    this.customer_svc.selectOneCustomer(customerId).subscribe(
      (res: Customer) => {
        this.customerUpdated = res;
      }
    );
    $("#update-form").modal('show');
  }

  deactivate(itemCustomer: Customer) {
    var respuesta = confirm("Are you sure you wish to deactivate " + itemCustomer.GSI1PK + "?");
    if (respuesta == true) {
      this.customer_svc.deactivateCustomer(itemCustomer.PK).subscribe();
      this.customers = this.customers.filter(item => item.PK !== itemCustomer.PK);
      alert(itemCustomer.GSI1PK + " has been de-activated.");
    }
  }

  updateCustomer(values) {
    console.log(values);

    let c: Customer = new Customer();

    c.GSI1PK = values.GSI1PK;
    c.Address1 = values.Address1;
    c.Phone1 = values.Phone1;
    c.Address2 = values.Address2;
    c.Phone2 = values.Phone2;
    c.GSI1SK = values.GSI1SK;
    c.Intrest = values.Intrest;
    c.Notes = values.Notes;
    c.GSI2PK = values.GSI2PK;
    c.Email = values.Email;
    c.InCharge = values.InCharge;


    let statusCode = this.customer_svc.updateCustomer(c, values.PK);

    if (statusCode = 201) {
      alert("Updated: " + c.GSI1PK);
      $('#update-form').modal('hide');
      this.getCustomers();
    } else {
      alert(c.GSI1PK + " was not updated!! \n\nError code: " + statusCode);
    }


  }


  getCustomers() {
    this.customer_svc.getCustomersByStatus("ACTIVE").subscribe(
      (res: Customer[]) => {
        this.customers = res;
      }
    );
  }

}
