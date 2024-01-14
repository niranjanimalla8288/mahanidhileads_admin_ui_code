import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { CityCreateComponent } from '../../city/city-create/city-create.component';
import { Cityserviceprovidercategory } from 'src/app/model/cityserviceprovidercategory';
import { CityserviceprovidercategoryService } from 'src/app/services/cityserviceprovidercategory.service';
import { CityserviceprovidercategoryComponent } from '../city-service-provider-category-create/cityserviceprovidercategory.component';
import { CityService } from 'src/app/services/city.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-city-service-provider-category-list',
  templateUrl: './city-service-provider-category-list.component.html',
  styleUrls: ['./city-service-provider-category-list.component.css']
})
export class CityServiceProviderCategoryListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'cityId',
    'serviceProviderCategoryId',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  // planModel: Badge = new Badge();
  Cities: any[] = [];
  serviceprovidercatergories: any[] = [];
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: CityserviceprovidercategoryService,
    public cityservice: CityService,
    public serviceprovidecategory: ServiceprovidercategoryService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this.cityservice.getCities().subscribe((data: any) => {
      console.log("Citydata", data);
      this.Cities = data
    });
    this.serviceprovidecategory.getServiceprovidercategories().subscribe((res: any) => {
      console.log('cityprovidercatergorydata:', res);
      this.serviceprovidercatergories = res;
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CityserviceprovidercategoryComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getCityServiceProviderCategories().subscribe((res: any) => {
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
    const confirmation = window.confirm('Are you sure you want to delete this CityServiceProviderCategory?');

    if (confirmation) {
      this._planService.deleteCityServiceProviderCategory(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('CityServiceProviderCategory deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting city service provider category:', err);

          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to delete this city service provider category.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('City service provider category not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the city service provider category. Please try again.');
          }
        },
      });
    }
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CityserviceprovidercategoryComponent, {
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
  getCityName(cityId: number): string {
    const City = this.Cities.find(c => c.id === cityId);
    return City ? City.name : '';
  }
  getcityprovidercatergorie(serviceProviderCategoryId: number): string {
    const ServiceProviderCategory = this.serviceprovidercatergories.find(c => c.id === serviceProviderCategoryId);
    return ServiceProviderCategory ? ServiceProviderCategory.name : '';
  }
  refreshList() {
    this._coreService.openSnackBar('Ciry Service Provider Category Details Successfully Refreshed', 'done');
    this.getPlanList();
  }
}
