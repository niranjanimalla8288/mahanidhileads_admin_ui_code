import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CreateServiceProvderBusinesstagsComponent } from '../create-service-provder-businesstags/create-service-provder-businesstags.component';
import { ServiceproviderbusinesstagService } from 'src/app/services/serviceproviderbusinesstag.service';
import { Serviceproviderbusinesstag } from 'src/app/model/serviceproviderbusinesstag';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { BusinesstagService } from 'src/app/services/businesstag.service';

@Component({
  selector: 'app-service-provider-business-tags-list',
  templateUrl: './service-provider-business-tags-list.component.html',
  styleUrls: ['./service-provider-business-tags-list.component.css']
})
export class ServiceProviderBusinessTagsListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'serviceProviderId',
    'businessTagId',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Serviceproviderbusinesstag = new Serviceproviderbusinesstag();

  id: number = 0;
  serviceProviderModel: any[] = [];
  businessTagModel: any[] = [];
  constructor(
    private _dialog: MatDialog,

    private _Service: ServiceproviderbusinesstagService,
    private _coreService: CoreService,
    private _serviceProvider: ServiceproviderService,
    private _businessTagService: BusinesstagService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this._serviceProvider.getServiceProviders().subscribe((data: any) => {
      this.serviceProviderModel = data;
    });

    this._businessTagService.getBusinesstags().subscribe((data: any) => {
      this.businessTagModel = data;
      console.log(data, "business details");
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderBusinesstagsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._Service.getServiceproviderbusinesstags().subscribe((res: any) => {
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
  deleteBusynessTag(id: number) {
    this._Service.deleteServiceproviderbusinesstag(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');
    });
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProvderBusinesstagsComponent, {
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


  getServiceproviderName(serviceProviderId: number): string {
    const Service = this.serviceProviderModel.find(s => s.id === serviceProviderId);
    return Service ? Service.businessName : ''
  }


  getBusinessTaName(businessTagId: number): string {
    const Service = this.businessTagModel.find(b => b.id === businessTagId);
    return Service ? Service.name : ''
  }
}
