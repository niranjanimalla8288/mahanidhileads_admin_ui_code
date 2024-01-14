import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { BusinessCreateComponent } from '../../business/business-create/business-create.component';
import { CityCreateComponent } from '../city-create/city-create.component';
import { CityService } from 'src/app/services/city.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'stateId',
    'gpslocation',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  planModel: Badge = new Badge();
  // id: number = 0;
  States: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _cityService: CityService,
    public stateservice: StateService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getCityList();
    // this.empForm.patchValue(this.data);
    this.stateservice.getStates().subscribe((data: any) => {
      console.log("statedata" + data);
      this.States = data
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CityCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityList();
        }
      },
    });
  }

  getCityList() {
    this._cityService.getCities().subscribe((res: any) => {
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
    const confirmation = window.confirm('Are you sure you want to delete this city?');

    if (confirmation) {
      this._cityService.deleteCity(id).subscribe({
        next: (data: any) => {
          this.getCityList();
          this._coreService.openSnackBar('City deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting city:', err);

          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to delete this city.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('City not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the city. Please try again.');
          }
        },
      });
    }
  }



  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CityCreateComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityList();
        }
      },
    });
  }



  getStateName(stateId: number): string {
    const State = this.States.find(c => c.id === stateId);
    return State ? State.name : '';
  }
  refreshList() {
    this._coreService.openSnackBar('City Details Successfully Refreshed', 'done');
    this.getCityList();
  }
}
