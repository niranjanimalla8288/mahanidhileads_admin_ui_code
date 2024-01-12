import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

import { CreateServiceProvderCategoryServicesComponent } from '../../ServiceProvderCategoryServices/create-service-provder-category-services/create-service-provder-category-services.component';
import { Serviceprovidersubscription } from 'src/app/model/serviceprovidersubscription';
import { ServiceprovidersubscriptionService } from 'src/app/services/serviceprovidersubscription.service';
import { PlanService } from 'src/app/services/plan.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';

@Component({
  selector: 'app-service-provider-subscriptions-list',
  templateUrl: './service-provider-subscriptions-list.component.html',
  styleUrls: ['./service-provider-subscriptions-list.component.css']
})
export class ServiceProviderSubscriptionsListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'planId',
    'serviceProviderId',
    'startDate',
    'endDate',
    'contractDocPath',
    'subscriptionAmount',
    'listingPosition',
    'action'


  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Plan: any[] = [];
  Prod: any[] = [];
  getPlanDetails: any;
  planModel: Serviceprovidersubscription = new Serviceprovidersubscription();

  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _plansService: PlanService, private SpsService: ServiceprovidersubscriptionService,
    private _coreService: CoreService,
    public router: Router,
    private ServiceProviderService: ServiceproviderService
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    this._plansService.getPlanList().subscribe((data: any) => {
      this.Plan = data;
    })
    this.ServiceProviderService.getServiceProviders().subscribe((data: any) => {
      this.Prod = data
    })
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvderCategoryServicesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this.SpsService.getServiceprovidersubscriptions().subscribe((res: any) => {
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
    this.SpsService.deleteServiceprovidersubscription(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Employee deleted!', 'done');
    });
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProvderCategoryServicesComponent, {
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
  getPlanName(planId: number): string {
    const State = this.Plan.find(c => c.id === planId);
    return State ? State.name : '';
  }
  getprodName(serviceProviderId: number): string {
    const State = this.Prod.find(c => c.id === serviceProviderId);
    return State ? State.businessName : '';
  }

}
