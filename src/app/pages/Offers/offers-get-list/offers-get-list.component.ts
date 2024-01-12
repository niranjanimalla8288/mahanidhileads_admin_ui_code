import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { OffersService } from 'src/app/services/offers.service';
import { OffersCreateUpdateComponent } from '../offers-create-update/offers-create-update.component';


@Component({
  selector: 'app-offers-get-list',
  templateUrl: './offers-get-list.component.html',
  styleUrls: ['./offers-get-list.component.css']
})
export class OffersGetListComponent {
  displayedColumns: string[] = [
    // 'id',
    // 'postId',
    'title',
    'featuredImage',
    // 'hasTimeLimit',
    // 'activationDate',
    // 'expirationDate',
    'createdBy',
    // 'createdTime',
    // 'publishTime',
    // 'lastUpdatedTime',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  // planModel: Badge = new Badge();
  logoBas641: any;
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: OffersService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(OffersCreateUpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getoffers().subscribe((res: any) => {
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
    this._planService.deleteoffers(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Badge deleted!', 'done');

    });
  }

  openEditForm(data: any) {
    console.log(data);

    const dialogRef = this._dialog.open(OffersCreateUpdateComponent, {
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
}
