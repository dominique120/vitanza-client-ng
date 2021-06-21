import { Component, OnInit } from '@angular/core';
import { faEdit, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/entities/customer';
import { Filter_change } from 'src/app/entities/filter_change';
import { Filter_installation } from 'src/app/entities/filter_installation';
import { CustomersService } from 'src/app/services/customers.service';
import { FilterchangeService } from 'src/app/services/filterchange.service';
import { FilterinstallationService } from 'src/app/services/filterinstallation.service';
import { Tools } from "../../../tools/tools"

declare var $: any;

@Component({
  selector: 'app-pending-changes',
  templateUrl: './pending-changes.component.html',
  styleUrls: ['./pending-changes.component.css']
})
export class PendingChangesComponent implements OnInit {

  faEdit = faEdit;
  faTimes = faTimes;
  faInfo = faInfo;

  constructor(private customer_svc: CustomersService,
    private filterChange_svc: FilterchangeService,
    private filterInstallation_svc: FilterinstallationService) { }

  ngOnInit(): void {
    this.getPendingChanges("PENDING", Tools.getDate(), Tools.getOffsetDate(30));
  }

  customer: Customer;
  filterChanges: Filter_change[];
  filterInstallation: Filter_installation;

  getPendingChanges(status: string, startDate: string, endDate: string): void {
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
    $("#pendingChangesCustomerModal").modal('show');
  }


  getInstallationInfo(customerId, filterInstallId): void {
    this.filterInstallation_svc.selectOneFilterInstallaiton(customerId, filterInstallId).subscribe(
      (res: Filter_installation) => {
        this.filterInstallation = res;
      }
    );
    $("#pendingInstallationModal").modal('show');
  }

}
