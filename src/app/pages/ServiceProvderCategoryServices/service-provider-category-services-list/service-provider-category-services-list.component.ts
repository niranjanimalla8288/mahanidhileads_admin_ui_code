import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CreateServiceProvderCategoryServicesComponent } from '../create-service-provder-category-services/create-service-provder-category-services.component';
import { Serviceprovidercategory_Service_Service } from 'src/app/services/serviceprovidercategoryservice.service';
import { ServiceprovidercategoryserviceModel } from 'src/app/model/serviceprovidercategoryservice';

@Component({
  selector: 'app-service-provider-category-services-list',
  templateUrl: './service-provider-category-services-list.component.html',
  styleUrls: ['./service-provider-category-services-list.component.css']
})
export class ServiceProviderCategoryServicesListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: ServiceprovidercategoryserviceModel = new ServiceprovidercategoryserviceModel();

  id: number = 0;
  getServiceprovidercategories: any;
  constructor(
    private _dialog: MatDialog,
    private _Service: Serviceprovidercategory_Service_Service,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderCategoryServicesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getServiceprovidercategories();
        }
      },
    });
  }
  getPlanList() {
    this._Service.getServiceprovidercategories().subscribe((res: any) => {
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

  deleteService(id: number) {
    this._Service.deleteServiePCS(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');

    });
  }
  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProvderCategoryServicesComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getServiceprovidercategories();
        }
      },
    });
  }
}
