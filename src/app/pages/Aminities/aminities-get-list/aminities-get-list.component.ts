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
import { AminitiesService } from 'src/app/services/aminities.service';
import { AminitiesCreateUpdateComponent } from '../aminities-create-update/aminities-create-update.component';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

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
    this._planService.deleteAmenities(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Badge deleted!', 'done');

    });
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
}
