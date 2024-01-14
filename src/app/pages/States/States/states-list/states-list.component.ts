import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CreateStatesComponent } from '../create-states/create-states.component';
import { StateService } from 'src/app/services/state.service';
import { State } from 'src/app/model/state';
import { CountryService } from 'src/app/services/country.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css']
})
export class StatesListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'countryId',
    'action'
  ];


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: State = new State();

  id: number = 0;
  getStates: any;
  country: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _Service: StateService,
    private countryService: CountryService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this.countryService.getCountries().subscribe((data: any) => {
      this.country = data;
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateStatesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStates();
        }
      },
    });
  }

  getPlanList() {
    this._Service.getStates().subscribe((res: any) => {
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
    const deletemessage = confirm("Confirm Delete State!");
    if (deletemessage) {
      this._Service.deleteState(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('State deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting state:', err);
          // Add more specific error handling or display user-friendly error messages
          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to perform this action.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('State not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the state. Please try again.');
          }
        },
      });
    }
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateStatesComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStates();
        }
      },
    });
  }

  getCountry(countryId: number): string {
    const Country = this.country.find(c => c.id === countryId);
    return Country ? Country.name : '';
  }
  refreshList() {
    this._coreService.openSnackBar('State Details Refreshed', 'done');
    this.getPlanList();
  }
}
