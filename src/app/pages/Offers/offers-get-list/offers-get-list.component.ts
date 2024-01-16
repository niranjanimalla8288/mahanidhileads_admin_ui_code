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
    this._planService.deleteoffers(id).subscribe(
      (data: any) => {
        // Success: Handle the success case
        this.getPlanList();
        this._coreService.openSnackBar('Offers deleted!', 'done');
      },
      (error: any) => {
        // Error: Handle the error case
        console.error('Error deleting Offers:', error);

        if (error.status === 401) {
          // Handle 401 Unauthorized error
          console.error('Unauthorized access. Please log in.');
          // You can redirect to a login page or show an unauthorized message.
        } else if (error.status === 403) {
          // Handle 403 Forbidden error
          console.error('Forbidden access. You do not have permission.');
          // You can redirect to an access denied page or show a permission denied message.
        } else {
          // Handle other errors
          console.error('Unexpected error. Please try again later.');
          // You can show a generic error message or perform other actions.
        }

        // You can show an error message or perform other actions as needed
        this._coreService.openSnackBar('Error deleting Offers!', 'error');
      }
    );
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

  refreshList() {
    this._coreService.openSnackBar('Offers Details Refreshed', 'done');
    this.getPlanList();
  }
}
