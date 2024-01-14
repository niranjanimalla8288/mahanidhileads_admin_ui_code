import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CoustomerComponent } from '../customer-create/coustomer.component';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'mobileNumber',
    'loginOtp',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog: MatDialog,
    private _customerService: CustomerService,
    private _coreService: CoreService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CoustomerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._customerService.getCustomers().subscribe((res: any) => {
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
  deleteCustomer(id: number) {
    const deletemessage = confirm("Confirm Delete Customer Details");
    if (deletemessage) {
      this._customerService.deleteCustomer(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Customer deleted!', 'done');
        },
        error: (err: any) => {
          console.error(err);

          // Handle specific error cases here
          if (err.status === 404) {
            this._coreService.openSnackBar('Customer not found!', 'error');
          } else {
            this._coreService.openSnackBar('Error deleting customer.', 'error');
          }
        },
      });
    }
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CoustomerComponent, {
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
    this._coreService.openSnackBar('Customer Details Refreshed', 'done');
    this.getPlanList();
  }
}
