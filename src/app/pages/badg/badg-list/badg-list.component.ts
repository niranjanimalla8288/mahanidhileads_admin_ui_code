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
import { BadgCreateComponent } from '../badg-create/badg-create.component';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-badg-list',
  templateUrl: './badg-list.component.html',
  styleUrls: ['./badg-list.component.css']
})
export class BadgListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'thumnailImagePath',
    'action'
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
    private _planService: BadgeService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(BadgCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getBadges().subscribe((res: any) => {
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

  // deleteEmployee(id: number) {
  //   this._planService.deleteBadge(id).subscribe((data: any) => {
  //     this.getPlanList();
  //     this._coreService.openSnackBar('Badge deleted!', 'done');

  //   });
  // }
  deleteEmployee(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this badge?');

    if (confirmDelete) {
      this._planService.deleteBadge(id).subscribe(
        (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Badge deleted!', 'done');
        },
        (error: any) => {
          console.error(error);

          // Handle specific error cases here
          if (error.status === 404) {
            alert('Badge not found!');
          } else {
            alert('Error deleting badge.');
          }
        }
      );
    }
  }


  openEditForm(data: any) {
    console.log(data);
    console.log(data.thumnailImagePath);

    const dialogRef = this._dialog.open(BadgCreateComponent, {
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
    this._coreService.openSnackBar('Badge Details Successfully Refreshed', 'done');
    this.getPlanList();
  }
}
