import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { PlanUpdateComponent } from '../../plan/plan-update/plan-update.component';
import { AminitiesService } from 'src/app/services/aminities.service';
import { AminitiesCreateUpdateComponent } from '../aminities-create-update/aminities-create-update.component';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { AlertPageComponent } from 'src/app/alert-page/alert-page.component';

@Component({
  selector: 'app-aminities-get-list',
  templateUrl: './aminities-get-list.component.html',
  styleUrls: ['./aminities-get-list.component.css']
})
export class AminitiesGetListComponent {
  displayedColumns: string[] = [
    // 'id',
    'categoryId',
    'options',
    'status',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  // planModel: Badge = new Badge();
  logoBas641: any;
  id: number = 0;
  categoryList: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _planService: AminitiesService,
    private _categoryService: ServiceprovidercategoryService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this.categoryGet();
  }

  categoryGet() {
    this._categoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.categoryList = data;
    });
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AminitiesCreateUpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getAmenities().subscribe((res: any) => {
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
    const deletemessage = confirm("Are you sure want to delete Aminities Details");
    if (deletemessage) {
      this._planService.deleteAmenities(id).subscribe(
        (data: any) => {
          // Handle successful deletion
          this.getPlanList();
          this._coreService.openSnackBar('Badge deleted!', 'done');
        },
        (error: any) => {
          // Handle error
          console.error('Error deleting badge:', error);

          if (error.status === 401) {
            // Unauthorized error handling
            this._coreService.openSnackBar('Unauthorized. Please log in.', 'error');
            // You might want to redirect the user to the login page or take appropriate action
          } else if (error.status === 403) {
            // Forbidden error handling
            this._coreService.openSnackBar('Forbidden. You do not have permission.', 'error');
            // You might want to redirect the user to a page indicating insufficient permissions
          } else {
            // Generic error handling
            this._coreService.openSnackBar('Error deleting badge. Please try again.', 'error');
          }
        }
      );
    }
  }


  openEditForm(data: any) {
    console.log(data);
    console.log(data.thumnailImagePath);

    const dialogRef = this._dialog.open(AminitiesCreateUpdateComponent, {
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

  getCagtegory(categoryId: number): string {
    const Category = this.categoryList.find(c => c.id === categoryId);
    return Category ? Category.name : '';
  }

  refreshList() {
    this._coreService.openSnackBar('Aminities Details Refreshed', 'done');
    this.getPlanList();
  }
}
