import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { City } from 'src/app/model/city';
import { CityService } from 'src/app/services/city.service';
import { AddsService } from 'src/app/services/adds.service';
import { AddsCreateComponent } from '../adds-create/adds-create.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-adds-details',
  templateUrl: './adds-details.component.html',
  styleUrls: ['./adds-details.component.css']
})
export class AddsDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    // 'id',
    'cityId',
    'categoryId',
    'addImage',
    'addPlace',
    'fromDate',
    'toDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  Cities: City[] = [];
  id: number = 0;
  logoBas641: any;
  serviceSubCategoryModel: any[] = [];
  serviceCategoryModel: any[] = [];
  logindetails: any;
  constructor(
    private _dialog: MatDialog,
    private addService: AddsService,
    private _coreService: CoreService,
    private cityService: CityService,
    private _serviceProviderCategory: ServiceprovidercategoryService,
    public router: Router,
    public authservice: LoginService

  ) { }

  ngOnInit(): void {
    const headers = { 'Authorization': 'Bearer my-token' }
    this.getPlanList();

    this.cityService.getCities().subscribe((data: any) => {
      this.Cities = data;
    });

    this._serviceProviderCategory.getServiceprovidercategories().subscribe((data: any) => {
      console.log(data, "Service Provider Category list")
      this.serviceCategoryModel = data;
    });

  }



  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddsCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this.addService.getAdds().subscribe((res: any) => {
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
  // deleteEmployee(id: number) {
  //   this.addService.deleteAdds(id).subscribe((data: any) => {
  //     this.getPlanList();
  //     this._coreService.openSnackBar('Service Provider deleted!', 'done');
  //   });
  // }
  deleteEmployee(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this Adds Details?');

    if (confirmDelete) {
      this.addService.deleteAdds(id).subscribe(
        (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Employee deleted!', 'done');
        },
        (error: any) => {
          console.error(error);

          // Handle specific error cases here
          if (error.status === 404) {
            // Handle not found error
            this._coreService.openSnackBar('Employee not found!');
          } else {
            // Handle other errors
            this._coreService.openSnackBar('Error deleting employee.');
          }
        }
      );
    }
  }
  refreshList() {
    this._coreService.openSnackBar('Adds Details Refreshed', 'done');
    this.getPlanList();
  }

  openAddEFormUpdate(data: any) {
    const dialogRef = this._dialog.open(AddsCreateComponent, {
      data,
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
  getCategoryName(categoryId: number): string {
    const Category = this.serviceCategoryModel.find(c => c.id === categoryId);
    return Category ? Category.name : ''
  }

}
