import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateServiceProviderBadgesComponent } from '../create-service-provider-badges/create-service-provider-badges.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { PlanService } from 'src/app/services/plan.service';
import { CreateServiceProvderCategoryServicesComponent } from '../../ServiceProvderCategoryServices/create-service-provder-category-services/create-service-provder-category-services.component';
import { ServiceproviderbadgeService } from 'src/app/services/serviceproviderbadge.service';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-service-provider-badges',
  templateUrl: './service-provider-badges.component.html',
  styleUrls: ['./service-provider-badges.component.css']
})
export class ServiceProviderBadgesComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'serviceProviderId',
    'badgeId',
    'expiryDate',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Badge = new Badge();

  serviceModel: any[] = [];
  badgeModel: any[] = [];
  id: number = 0;
  constructor(
    private _dialog: MatDialog,
    private _serviceProvider: ServiceproviderService,
    private _badgeService: BadgeService,
    private _Service: ServiceproviderbadgeService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    // this.empForm.patchValue(this.data);
    this._serviceProvider.getServiceProviders().subscribe((data: any) => {
      this.serviceModel = data;
      console.log(data);
    });

    this._badgeService.getBadges().subscribe((data: any) => {
      this.badgeModel = data;
      console.log(data);
    });

  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProviderBadgesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._Service.getServiceproviderbadges().subscribe((res: any) => {
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
  deleteBadge(id: number) {
    const DeleteMessage = confirm("confirm Delete Service Provider Badges !");
    if (DeleteMessage) {
      this._Service.deleteServiceproviderbadge(id).subscribe({
        next: (data: any) => {
          this.getPlanList();
          this._coreService.openSnackBar('Service Provider Badges deleted!', 'done');
        },
        error: (err: any) => {
          console.error('Error deleting service provider badge:', err);
          // Add more specific error handling or display user-friendly error messages
          if (err.status === 401) {
            this._coreService.openSnackBar('Unauthorized. Please login and try again.');
          } else if (err.status === 403) {
            this._coreService.openSnackBar('Forbidden. You do not have permission to perform this action.');
          } else if (err.status === 404) {
            this._coreService.openSnackBar('Service provider badge not found. Please check the details.');
          } else {
            this._coreService.openSnackBar('An error occurred while deleting the service provider badge. Please try again.');
          }
        },
      });
    }
  }

  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CreateServiceProviderBadgesComponent, {
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


  getServiceProviderName(serviceProviderId: number): string {
    const ServiceProvider = this.serviceModel.find(s => s.id === serviceProviderId);
    return ServiceProvider ? ServiceProvider.businessName : '';
  }
  getBadgeName(badgeId: number): string {
    const Badge = this.badgeModel.find(b => b.id === badgeId);
    return Badge ? Badge.name : '';
  }

  refreshList() {
    this._coreService.openSnackBar('Service Provider Badges Details Refreshed', 'done');
    this.getPlanList();
  }
}
