import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';
import { CoreService } from 'src/app/core/core.service';
import { PlanUpdateComponent } from '../plan-update/plan-update.component';
import { Plan } from 'src/app/model/plan';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'name',
    'cost',
    'durationInMonths',
    'positionInListing',
    'action'


  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  planModel: Plan = new Plan();

  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: PlanService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(PlanUpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getPlanList().subscribe((res: any) => {
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
    this._planService.deletePlan(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');
    });
  }

  openEditForm(data: any) {

    console.log(data);
    console.log("Hi open edit form");
    const dialogRef = this._dialog.open(PlanUpdateComponent, {
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


}
