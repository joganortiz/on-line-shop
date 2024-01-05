import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Customer, Representative } from './interfaces';
import { LazyLoadEvent } from 'primeng/api';
import { CustomerService } from '../../../services/customer.service';
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MultiSelectModule],
  templateUrl: './table.component.html'
})
export class TableComponent {
  customers!: Customer[];

  header = [
    {
        key: "name",
        name: "Name"
    },
    {
        key: "country.name",
        name: "Country"
    },
    {
        key: "company",
        name: "Company"
    }
  ];

  totalRecords!: number;

  loading: boolean = false;

  selectAll: boolean = false;

  selectedCustomers!: Customer[];

  constructor(private customerService: CustomerService) {
    
  }

  ngOnInit() {
    this.loading = true;

}

loadCustomers(event: any) {
    this.loading = true;
    console.log(event)
    setTimeout(() => {
        this.customerService.getCustomers({ lazyEvent: JSON.stringify(event) }).then((res: any) => {
            console.log(res.customers)
            this.customers = res.customers;
            this.totalRecords = res.totalRecords;
            this.loading = false;
        });
    }, 1000);
}

onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
}

onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
        this.customerService.getCustomers().then((res: any) => {
            this.selectedCustomers = res.customers;
            this.selectAll = true;
        });
    } else {
        this.selectedCustomers = [];
        this.selectAll = false;
    }
}
}
