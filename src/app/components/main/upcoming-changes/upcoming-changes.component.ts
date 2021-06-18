import { Component, OnInit } from '@angular/core';
import { faEdit, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/entities/customer';
import { Filter_change } from 'src/app/entities/filter_change';
import { Filter_installation } from 'src/app/entities/filter_installation';
import { CustomersService } from 'src/app/services/customers.service';
import { FilterchangeService } from 'src/app/services/filterchange.service';
import { FilterinstallationService } from 'src/app/services/filterinstallation.service';

declare var $: any;

@Component({
  selector: 'app-upcoming-changes',
  templateUrl: './upcoming-changes.component.html',
  styleUrls: ['./upcoming-changes.component.css']
})
export class UpcomingChangesComponent implements OnInit {

  faEdit = faEdit;
  faTimes = faTimes;
  faInfo = faInfo;


  constructor(private customer_svc: CustomersService,
    private filterChange_svc: FilterchangeService,
    private filterInstallation_svc: FilterinstallationService) { }

  ngOnInit(): void {
    this.getUpcomingChanges("UPCOMING", this.getDate(), this.getNextMonth());
  }

  customer: Customer;
  filterChanges: Filter_change[];
  filterInstallation: Filter_installation;

  getUpcomingChanges(status: string, startDate: string, endDate: string): void {
    this.filterChange_svc.getChangesByStatusAndDate(status, startDate, endDate).subscribe(
      (res: Filter_change[]) => {
        this.filterChanges = res;
      }
    );
  }


  getCustomer(customerId): void {
    this.customer_svc.selectOneCustomer(customerId).subscribe(
      (res: Customer) => {
        this.customer = res;
      }
    );
    $("#upcomingChangesCustomerModal").modal('show');
  }


  getInstallationInfo(customerId, filterInstallId): void {
    this.filterInstallation_svc.selectOneFilterInstallaiton(customerId, filterInstallId).subscribe(
      (res: Filter_installation) => {
        this.filterInstallation = res;
      }
    );
    $("#upcomingInstallationModal").modal('show');
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
