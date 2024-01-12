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

@Component({
  selector: 'app-adds-details',
  templateUrl: './adds-details.component.html',
  styleUrls: ['./adds-details.component.css']
})
export class AddsDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    // 'id',
    'cityid',
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
    public router: Router,
    public authservice: LoginService

  ) { }

  ngOnInit(): void {
    const headers = { 'Authorization': 'Bearer my-token' }
    this.getPlanList();

    this.cityService.getCities().subscribe((data: any) => {
      this.Cities = data;
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
  deleteEmployee(id: number) {
    this.addService.deleteAdds(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Service Provider deleted!', 'done');
    });
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
}
