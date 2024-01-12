import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CustomFields } from 'src/app/model/customfields';
import { CustomfieldsService } from 'src/app/services/customfields.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { CustomeFieldsCreateComponent } from '../custome-fields-create/custome-fields-create.component';

@Component({
  selector: 'app-custome-fields-list',
  templateUrl: './custome-fields-list.component.html',
  styleUrls: ['./custome-fields-list.component.css']
})
export class CustomeFieldsListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'categoryId',
    'fieldName',
    'fieldTitle',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Category: any[] = [];
  getPlanDetails: any;
  planModel: CustomFields = new CustomFields();
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: CustomfieldsService,
    private _coreService: CoreService, private categoryService: ServiceprovidercategoryService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this.categoryService.getServiceprovidercategories().subscribe((data: any) => {
      this.Category = data;
    })
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CustomeFieldsCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getCF().subscribe((res: any) => {
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
    this._planService.deleteCF(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');
    });
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CustomeFieldsCreateComponent, {
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

  getCategoryName(categoryId: number): string {
    const State = this.Category.find(c => c.id === categoryId);
    return State ? State.name : '';
  }
}