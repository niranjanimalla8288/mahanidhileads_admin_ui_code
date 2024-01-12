import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PaymentmodeComponent } from '../payment-mode-create/paymentmode.component';
import { PaymentmodeService } from 'src/app/services/paymentmode.service';

@Component({
  selector: 'app-payment-mode-list',
  templateUrl: './payment-mode-list.component.html',
  styleUrls: ['./payment-mode-list.component.css']
})
export class PaymentModeListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
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
    private _Service: PaymentmodeService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(PaymentmodeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._Service.getPaymentModes().subscribe((res: any) => {
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

  deletePaymentDetails(id: number) {
    this._Service.deletePaymentMode(id).subscribe((data: any) => {
      this._coreService.openSnackBar('Payment Details deleted!', 'done');
    });
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(PaymentmodeComponent, {
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
