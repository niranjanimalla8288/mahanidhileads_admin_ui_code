import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { BusinessRegisterService } from 'src/app/services/business-register.service';

@Component({
  selector: 'app-business-register-details',
  templateUrl: './business-register-details.component.html',
  styleUrls: ['./business-register-details.component.css']
})
export class BusinessRegisterDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    // 'id',
    'firstName',
    'lastName',
    'email',
    'companyName',
    'phoneNumber',
    'address',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  businessData: any;
  constructor(
    public _service: BusinessRegisterService,
    public router: Router,
    public _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getBusinessList();
  }

  getBusinessList() {
    this._service.getBusinesslist().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
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

  refreshList() {
    this._coreService.openSnackBar('Leads Details Refreshed', 'done');
    this.getBusinessList();
  }


}

