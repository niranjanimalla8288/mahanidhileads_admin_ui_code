import { Component, ViewChild } from '@angular/core';
import { LeadPositionRangeService } from 'src/app/services/lead-position-range.service';
import { Leadpositionrange } from 'src/app/model/leadpositionrange';
import { CreateLeadpositionRangeComponent } from '../../LeadPositionRange/create-leadposition-range/create-leadposition-range.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-lead-position-range-list',
  templateUrl: './lead-position-range-list.component.html',
  styleUrls: ['./lead-position-range-list.component.css']
})
export class LeadPositionRangeListComponent {


  displayedColumns: string[] = [
    // 'id',
    'positionName',
    'price',
    'positionFrom',
    'positionTo',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Leadpositionrange = new Leadpositionrange();
  // id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _planService: LeadPositionRangeService,
    // public stateservice: StateService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();

  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateLeadpositionRangeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getLPR().subscribe((res: any) => {
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
    this._planService.deleteLPR(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('LPR deleted!', 'done');
    });
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateLeadpositionRangeComponent, {
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
