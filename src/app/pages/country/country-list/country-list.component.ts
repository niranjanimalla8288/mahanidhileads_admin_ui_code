import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { CountryComponent } from '../country-create/country.component';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'code',
    'currencyCode',
    'telecomeCode',
    'currencySymbol',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Badge = new Badge();

  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: CountryService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CountryComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getCountries().subscribe((res: any) => {
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
  deleteCountry(id: number) {
    const deleteMessage = confirm("Contry Confirm Delete");
    if (deleteMessage) {
      this._planService.deleteCountry(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Country deleted!', 'done');
        },
        error: (err: any) => {
          console.error(err);

          // Handle specific error cases here
          if (err.status === 404) {
            this._coreService.openSnackBar('Country not found!', 'error');
          } else {
            this._coreService.openSnackBar('Error deleting country.', 'error');
          }
        },
      });
    }
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CountryComponent, {
      data,
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
    this._coreService.openSnackBar('Country Details Refreshed', 'done');
    this.getPlanList();
  }
}
