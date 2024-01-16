import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { CreateServiceProvderCategoryServicesComponent } from '../../ServiceProvderCategoryServices/create-service-provder-category-services/create-service-provder-category-services.component';
import { ServiceproviderreviewService } from 'src/app/services/serviceproviderreview.service';
import { CreateServiceProvderReviewsComponent } from '../create-service-provder-reviews/create-service-provder-reviews.component';
import { CustomerService } from 'src/app/services/customer.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';

@Component({
  selector: 'app-service-provider-reviews-list',
  templateUrl: './service-provider-reviews-list.component.html',
  styleUrls: ['./service-provider-reviews-list.component.css']
})
export class ServiceProviderReviewsListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'customerId',
    'serviceProviderId',
    'reviewTitle',
    'reviewDescription',
    'rating',
    'action'


  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Badge = new Badge();
  customers: any[] = [];
  provider: any[] = [];
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: ServiceproviderreviewService,
    private _serviceProvider: ServiceproviderService,
    public _customerService: CustomerService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this._customerService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });
    this._serviceProvider.getServiceProviders().subscribe((data: any) => {
      this.provider = data;
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderReviewsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getServiceproviderreviews().subscribe((res: any) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id: number) {
    this._planService.deleteServiceproviderreview(id).subscribe(
      (data: any) => {
        // Handle success, if needed
        this.getPlanList();
        this._coreService.openSnackBar('Service Provider Review deleted!', 'done');
      },
      (error: any) => {
        // Handle error
        console.error(error);

        // Check for 401 (Unauthorized) or 403 (Forbidden) status codes
        if (error.status === 401) {
          this._coreService.openSnackBar('Unauthorized access! Please log in.', 'error');
          // Optionally, you can redirect to the login page or perform other actions
        } else if (error.status === 403) {
          this._coreService.openSnackBar('Access forbidden! You do not have permission for this action.', 'error');
          // Optionally, you can redirect to an unauthorized page or perform other actions
        } else {
          // For other errors, provide a generic error message
          this._coreService.openSnackBar('Error deleting Service Provider Review!', 'error');
        }
      }
    );
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProvderReviewsComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getCustomername(customerId: number): string {
    const Customer = this.customers.find(c => c.id === customerId);
    return Customer ? Customer.name : '';
  }

  getProviderName(serviceProviderId: number): string {
    const Provider = this.provider.find(p => p.id === serviceProviderId);
    return Provider ? Provider.businessName : '';
  }

  refreshList() {
    this._coreService.openSnackBar('Service Provider Review Details Refreshed', 'done');
    this.getPlanList();
  }
}
