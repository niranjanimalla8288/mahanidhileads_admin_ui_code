import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { City } from 'src/app/model/city';
import { State } from 'src/app/model/state';
import { CityService } from 'src/app/services/city.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { StateService } from 'src/app/services/state.service';
import { OrganizationComponent } from '../organization-create/organization.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'contactPerson',
    'contactNumber',
    // 'supportNumber',
    // 'supportEmail',
    // 'addressLine1',
    // 'addressLine2',
    // 'addressLine3',
    'stateId',
    'cityId',
    // 'pinCode',
    // 'countryId',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  States: State[] = [];
  Cities: City[] = [];
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: OrganizationService,
    private _coreService: CoreService,
    public router: Router,
    private stateService: StateService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.getPlanList();

    this.stateService.getStates().subscribe((data: any) => {
      this.States = data;
    });

    this.cityService.getCities().subscribe((data: any) => {
      this.Cities = data;
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(OrganizationComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getOrganizations().subscribe((res: any) => {
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
  deleteOrganization(id: number) {
    const deletemessage = confirm("Confirm Delete Organization Details");
    if (deletemessage) {
      this._planService.deleteOrganization(id).subscribe(
        (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Organization deleted!', 'done');
        },
        (error: any) => {
          console.error(error);

          // Handle specific error cases here
          if (error.status === 404) {
            this._coreService.openSnackBar('Organization not found!', 'error');
          } else {
            this._coreService.openSnackBar('Error deleting organization.', 'error');
          }
        }
      );
    }
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(OrganizationComponent, {
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

  getStateName(stateId: number): string {
    const State = this.States.find(c => c.id === stateId);
    return State ? State.name : '';
  }
  getCityName(cityId: number): string {
    const State = this.Cities.find(c => c.id === cityId);
    return State ? State.name : '';
  }

  refreshList() {
    this._coreService.openSnackBar('Organaization Details Refreshed', 'done');
    this.getPlanList();
  }
}
