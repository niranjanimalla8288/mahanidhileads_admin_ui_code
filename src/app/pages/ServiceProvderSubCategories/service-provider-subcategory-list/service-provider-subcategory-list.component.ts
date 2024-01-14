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
import { ServiceprovidersubcategoryService } from 'src/app/services/serviceprovidersubcategory.service';
import { CreateServiceProvderSubCategoriesComponent } from '../create-service-provder-sub-categories/create-service-provder-sub-categories.component';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-service-provider-subcategory-list',
  templateUrl: './service-provider-subcategory-list.component.html',
  styleUrls: ['./service-provider-subcategory-list.component.css']
})
export class ServiceProviderSubcategoryListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    // 'parentCategoryId',
    'mainCategoryId',
    'thumnailImagePath',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Badge = new Badge();

  id: number = 0;
  serviceProviderCategoryModel: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _planService: ServiceprovidersubcategoryService,
    private _coreService: CoreService,
    public router: Router,
    private _serviceProviderCategory: ServiceprovidercategoryService
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    console.log(this.getPlanList(), "hi testing");

    this._serviceProviderCategory.getServiceprovidercategories().subscribe((data: any) => {
      this.serviceProviderCategoryModel = data;
      console.log(data, "service provider category data");
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderSubCategoriesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getServiceprovidersubcategories().subscribe((res: any) => {
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
  deleteServiceprovidersubcategory(id: number) {
    const deletemessage = confirm("Are you sure want to delete Service Provider Sub Category Details");
    if (deletemessage) {
      this._planService.deleteServiceprovidersubcategory(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Service Provider Subcategory deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting service provider subcategory:', err);

          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to delete this service provider subcategory.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('Service Provider Subcategory not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the service provider subcategory. Please try again.');
          }
        },
      });
    }
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProvderSubCategoriesComponent, {
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

  getServiceProviderCategoryIdbyName(mainCategoryId: number): string {
    const Category = this.serviceProviderCategoryModel.find(c => c.id === mainCategoryId);
    return Category ? Category.name : ''
  }


  // image convert to base64

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertImageToBase64(file);
    }
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64String = e.target.result;
      console.log('Base64 Image:', base64String);

      // Now you can use the base64String as needed (e.g., send it to the server)
    };

    reader.readAsDataURL(file);
  }

  refreshList() {
    this._coreService.openSnackBar('Service Provider Sub Category Details Refreshed', 'done');
    this.getPlanList();
  }
}
