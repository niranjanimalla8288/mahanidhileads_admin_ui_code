import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { CreateServiceProvderServicesComponent } from '../create-service-provder-services/create-service-provder-services.component';
import { ServiceproviderserviceService } from 'src/app/services/serviceproviderservice.service';
import { Serviceproviderservice } from 'src/app/model/serviceproviderservice';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';

@Component({
  selector: 'app-service-provider-services-list',
  templateUrl: './service-provider-services-list.component.html',
  styleUrls: ['./service-provider-services-list.component.css']
})
export class ServiceProviderServicesListComponent implements OnInit {
  deleteEmployee(arg0: any) {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = [
    // 'id',
    'serviceProviderCategoryServicesId',
    'serviceProviderId',
    'thumnailImagePath',
    // 'serviceProviderCategoryServices',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  logoBas64!: string;
  getPlanDetails: any;
  planModel: Serviceproviderservice = new Serviceproviderservice();
  serviceProviderCategoryModel: any[] = [];
  serviceProviderModel: any[] = [];

  getServiceproviderservices: any;
  constructor(
    private _dialog: MatDialog,
    private _Service: ServiceproviderserviceService,
    private _coreService: CoreService,
    private _serviceProviderCategoryService: ServiceprovidercategoryService,
    private _serviceProviderService: ServiceproviderService
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this._serviceProviderCategoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.serviceProviderCategoryModel = data;
      console.log(data, "service provider category data");
    });

    this._serviceProviderService.getServiceProviders().subscribe((data: any) => {
      this.serviceProviderModel = data;
      console.log(data, "service provider data");
    });

  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderServicesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getServiceproviderservices();
        }
      },
    });
  }

  getPlanList() {
    this._Service.getServiceproviderservices().subscribe((res: any) => {
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

  // deleteService(id: number) {
  //   this._Service.deleteServiePCS(id).subscribe((data: any) => {
  //     this.getServiceprovidercategories();
  //     this._coreService.openSnackBar('Employee deleted!', 'done');
  //     this.getPlanList();
  //   });
  // }

  delete(id: number) {
    this._Service.deleteServiceproviderservice(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');

    });
  }
  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProvderServicesComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getServiceproviderservices();
        }
      },
    });
  }


  getServiceProviderCategoryIdByName(serviceProviderCategoryServicesId: number): string {
    const ServiceProvider = this.serviceProviderCategoryModel.find(s => s.id === serviceProviderCategoryServicesId);
    return ServiceProvider ? ServiceProvider.name : ''
  }

  getServiceProviderIdByName(serviceProviderId: number): string {
    const ServiceProvider = this.serviceProviderModel.find(s => s.id === serviceProviderId);
    return ServiceProvider ? ServiceProvider.businessName : ''
  }
}
