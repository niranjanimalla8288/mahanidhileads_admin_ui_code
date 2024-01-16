import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

import { Leadposition } from 'src/app/model/leadposition';
import { CreateLeadPositionComponent } from '../create-lead-position/create-lead-position.component';
import { LeadPositionService } from 'src/app/services/lead-position.service';
import { CityService } from 'src/app/services/city.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { LeadPositionRangeService } from 'src/app/services/lead-position-range.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';

@Component({
  selector: 'app-lead-position-list',
  templateUrl: './lead-position-list.component.html',
  styleUrls: ['./lead-position-list.component.css']
})
export class LeadPositionListComponent {

  displayedColumns: string[] = [
    // 'id',
    'cityId',
    'categoryId',
    'leadpositionRangeId',
    'serviceProviderId',
    'fromDate',
    'toDate',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  planModel: Leadposition = new Leadposition();
  Cities: any[] = [];
  Categories: any[] = [];
  LPR: any[] = [];
  Sp: any[] = []
  // id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: LeadPositionService, private cityService: CityService, private categoryService: ServiceprovidercategoryService, private LPRService: LeadPositionRangeService, private SPService: ServiceproviderService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    this.cityService.getCities().subscribe((data: any) => {
      this.Cities = data
    });
    this.categoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.Categories = data;
    });
    this.LPRService.getLPR().subscribe((data: any) => {
      this.LPR = data
    });
    this.SPService.getServiceProviders().subscribe((data: any) => {
      this.Sp = data
    });

  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateLeadPositionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getLP().subscribe((res: any) => {
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
    this._planService.deleteLP(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('City deleted!', 'done');
    });
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateLeadPositionComponent, {
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
    const State = this.Cities.find(c => c.id === cityId);
    return State ? State.name : '';
  }
  getSPName(serviceProviderId: number): string {
    const State = this.Sp.find(c => c.id === serviceProviderId);
    return State ? State.businessName : '';
  }

  getLPRName(leadpositionRangeId: number): string {
    const State = this.LPR.find(c => c.id === leadpositionRangeId);
    return State ? State.positionName : '';
  }

  getCategoryName(categoryId: number): string {
    const State = this.Categories.find(c => c.id === categoryId);
    return State ? State.name : '';
  }
  refreshList() {
    this._coreService.openSnackBar('Lead Position Details Refreshed', 'done');
    this.getPlanList();
  }
}
