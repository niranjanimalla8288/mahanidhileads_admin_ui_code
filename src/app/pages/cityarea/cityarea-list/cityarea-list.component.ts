import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CityareaService } from 'src/app/services/cityarea.service';
import { CityareaComponent } from '../cityarea-create/cityarea.component';
import { CityService } from 'src/app/services/city.service';
import { Badge } from 'src/app/model/badge';
import { StateService } from 'src/app/services/state.service';
import { CityCreateComponent } from '../../city/city-create/city-create.component';

@Component({
  selector: 'app-cityarea-list',
  templateUrl: './cityarea-list.component.html',
  styleUrls: ['./cityarea-list.component.css']
})
export class CityareaListComponent implements OnInit {



  displayedColumns: string[] = [
    // 'id',
    // 'name',
    // 'stateId',
    // 'gpslocation',
    // 'action'
    'name',
    'cityId',
    'pinCode',
    'gpslocation',
    'searchRadiusInKms',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  planModel: Badge = new Badge();
  // id: number = 0;
  States: any[] = [];
  City: any[] = [];
  cityArea: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _cityService: CityService,
    private _cityAreasService: CityareaService,
    public stateservice: StateService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getCityAreaList();
    // this.empForm.patchValue(this.data);
    this.stateservice.getStates().subscribe((data: any) => {
      console.log("statedata", data);
      this.States = data
    });

    this._cityAreasService.getCityareas().subscribe((data: any) => {
      console.log(data, "city area data");
      this.cityArea = data;

    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CityareaComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityAreaList();
        }
      },
    });
  }

  getCityAreaList() {
    this._cityAreasService.getCityareas().subscribe((res: any) => {
      console.log(res, "city area list");
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
    const confirmation = window.confirm('Are you sure you want to delete this city Area?');

    if (confirmation) {
      this._cityService.deleteCity(id).subscribe({
        next: (data: any) => {
          this.getCityAreaList();
          this._coreService.openSnackBar('City Area deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting city:', err);

          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to delete this City Area.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('City Area not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the City Area. Please try again.');
          }
        },
      });
    }
  }



  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CityareaComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityAreaList();
        }
      },
    });
  }



  getCityName(cityId: number): string {
    const State = this.States.find(c => c.id === cityId);
    return State ? State.name : '';
  }
  refreshList() {
    this._coreService.openSnackBar('City Area Details Successfully Refreshed', 'done');
    this.getCityAreaList();
  }
}
