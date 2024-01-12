import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { CreateServiceProvderCategoriesComponent } from '../create-service-provder-categories/create-service-provder-categories.component';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';

@Component({
  selector: 'app-service-provider-category-list',
  templateUrl: './service-provider-category-list.component.html',
  styleUrls: ['./service-provider-category-list.component.css']
})
export class ServiceProviderCategoryListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'thumnailImagePath',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // formGroup!: FormGroup;
  getPlanDetails: any;
  planModel: Badge = new Badge();
  // logoBas64!: string;
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: ServiceprovidercategoryService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderCategoriesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getServiceprovidercategories().subscribe((res: any) => {
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
  deleteServiceProviderCategory(id: number) {
    this._planService.deleteServiceprovidercategory(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');
    });
  }

  openEditForm(data: any) {
    console.log(data);

    const dialogRef = this._dialog.open(CreateServiceProvderCategoriesComponent, {
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

  // image 
  // Image Convert to Base64

}
