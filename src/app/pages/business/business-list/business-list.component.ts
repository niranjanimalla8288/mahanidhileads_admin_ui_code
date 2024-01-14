import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { BusinessCreateComponent } from '../business-create/business-create.component';
import { BusinesstagService } from 'src/app/services/businesstag.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  // planModel: Badge = new Badge();

  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: BusinesstagService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(BusinessCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getBusinesstags().subscribe((res: any) => {
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

  deleteBusiness(id: number) {
    const deletemessage = confirm("Confirm Delete Buniess Details!");
    if (deletemessage) {
      this._planService.deleteBusinesstag(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Business deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting business:', err);

          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to delete this business.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('Business not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the business. Please try again.');
          }
        },
      });
    }
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(BusinessCreateComponent, {
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
    this._coreService.openSnackBar('Business Details Refreshed', 'done');
    this.getPlanList();
  }
}
