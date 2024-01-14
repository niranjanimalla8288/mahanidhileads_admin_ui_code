import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { ServiceprovidersubscriptionspaymentService } from 'src/app/services/serviceprovidersubscriptionspayment.service';
import { ServiceproviderserviceService } from 'src/app/services/serviceproviderservice.service';
import { UpdateServiceProvderSubscriptionPaymentsComponent } from '../update-service-provder-subscription-payments/update-service-provder-subscription-payments.component';
import { ServiceprovidersubcategoryService } from 'src/app/services/serviceprovidersubcategory.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { ServiceprovidersubscriptionService } from 'src/app/services/serviceprovidersubscription.service';

@Component({
  selector: 'app-service-provider-subscription-payments-list',
  templateUrl: './service-provider-subscription-payments-list.component.html',
  styleUrls: ['./service-provider-subscription-payments-list.component.css']
})
export class ServiceProviderSubscriptionPaymentsListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'serviceProviderId',
    // 'serviceProviderSubscriptionId',
    'paidAmount',
    // 'paymentModeId',
    // 'paymentDate',
    // 'transactionReference',
    'action'


  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id: number = 0;

  serviceProviderModel: any[] = [];
  serviceProviderSubcategoryModel: any[] = [];
  serviceProviderPaymentModel: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _Service: ServiceprovidersubscriptionspaymentService,
    private _coreService: CoreService,
    private _serviceProvider: ServiceproviderService,
    private _serviceProviderSubscription: ServiceprovidersubscriptionService,
    private _serviceProviderPaymentMode: ServiceprovidersubscriptionspaymentService
  ) { }

  ngOnInit(): void {
    this.getSPSPaymentList();
    // this.empForm.patchValue(this.data);
    this._serviceProviderPaymentMode.getServiceprovidersubscriptionspayments().subscribe((data: any) => {
      this.serviceProviderPaymentModel = data;
      console.log(data, "Payment data");
    });
    this._serviceProviderSubscription.getServiceprovidersubscriptions().subscribe((data: any) => {
      this.serviceProviderSubcategoryModel = data;
      console.log(data, "Subscription data");
    });
    this._serviceProvider.getServiceProviders().subscribe((data: any) => {
      this.serviceProviderModel = data;
      console.log(data, "service providerData");
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(UpdateServiceProvderSubscriptionPaymentsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSPSPaymentList();
        }
      },
    });
  }

  getSPSPaymentList() {
    this._Service.getServiceprovidersubscriptionspayments().subscribe((res: any) => {
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

  // deleteServiceprovideSubscriptionpaymentDetails(id: number) {
  //   this._Service.deleteServiceprovidersubscriptionspayment(id).subscribe((data: any) => {
  //     this.getSPSPaymentList();
  //     this._coreService.openSnackBar('Employee deleted!', 'done');

  //   });
  // }
  deleteServiceprovideSubscriptionpaymentDetails(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this._Service.deleteServiceprovidersubscriptionspayment(id).subscribe(
        (data: any) => {
          this.getSPSPaymentList();
          this._coreService.openSnackBar('Employee deleted!', 'done');
        },
        (error: any) => {
          console.error(error);

          // Handle specific error cases here
          if (error.status === 404) {
            this._coreService.openSnackBar('Payment not found!', 'error');
          } else {
            this._coreService.openSnackBar('Error deleting payment.', 'error');
          }
        }
      );
    }
  }

  openEditForm(data: any) {
    console.log(data);
    console.log("Hi open edit form");
    const dialogRef = this._dialog.open(UpdateServiceProvderSubscriptionPaymentsComponent, {
      data,

    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSPSPaymentList();
        }
      },
    });
  }


  //  getStateName(stateId: number): string {
  //   const State = this.States.find(c => c.id === stateId);
  //   return State ? State.name : '';
  // }
  getServiceProviderName(serviceProviderId: number): string {
    const ServiceProvider = this.serviceProviderModel.find(s => s.id === serviceProviderId);
    return ServiceProvider ? ServiceProvider.businessName : '';
  }

  getServiceProviderSubcriptionIdName(serviceProviderSubscriptionId: number): string {
    const ServiceProviderSubCategoryIDName = this.serviceProviderSubcategoryModel.find(a => a.id === serviceProviderSubscriptionId);
    return ServiceProviderSubCategoryIDName ? ServiceProviderSubCategoryIDName.name : '';
  }

  getServiceProviderPaymentIdwithName(paymentModeId: number): string {
    const ServicePayment = this.serviceProviderPaymentModel.find(p => p.id === paymentModeId);
    return ServicePayment ? ServicePayment.name : '';
  }

  refreshList() {
    this._coreService.openSnackBar('Payment Details Refreshed', 'done');
    this.getSPSPaymentList();
  }
}
