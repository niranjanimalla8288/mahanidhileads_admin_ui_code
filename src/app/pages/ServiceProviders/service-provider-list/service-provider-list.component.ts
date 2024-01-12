import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { Badge } from 'src/app/model/badge';
import { CreateServiceProvidersComponent } from '../create-service-providers/create-service-providers.component';
import { ServiceproviderService } from 'src/app/services/serviceprovider.service';
import { ServiceprovidercategoryService } from 'src/app/services/serviceprovidercategory.service';
import { ServiceprovidersubcategoryService } from 'src/app/services/serviceprovidersubcategory.service';
import { UpdateServieProviderComponent } from '../update-servie-provider/update-servie-provider.component';

@Component({
  selector: 'app-service-provider-list',
  templateUrl: './service-provider-list.component.html',
  styleUrls: ['./service-provider-list.component.css']
})
export class ServiceProviderListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'businessName',
    'subCategoryId',
    'mainCategoryId',
    'thumnailImagePath',
    'email',
    'action'

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPlanDetails: any;
  planModel: Badge = new Badge();

  id: number = 0;
  logoBas641: any;
  serviceSubCategoryModel: any[] = [];
  serviceCategoryModel: any[] = [];
  constructor(
    private _dialog: MatDialog,
    private _planService: ServiceproviderService,

    private _coreService: CoreService,
    private serviceProviderSub: ServiceprovidersubcategoryService,
    private serviceProviderCategory: ServiceprovidercategoryService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPlanList();
    this.serviceProviderSub.getServiceprovidersubcategories().subscribe((data: any) => {
      this.serviceSubCategoryModel = data;
    });

    this.serviceProviderCategory.getServiceprovidercategories().subscribe((data: any) => {
      this.serviceCategoryModel = data;
    });
    // this.empForm.patchValue(this.data);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CreateServiceProvidersComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlanList();
        }
      },
    });
  }

  getPlanList() {
    this._planService.getServiceProviders().subscribe((res: any) => {
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
  deleteServiceProvider(id: number) {
    this._planService.deleteServiceProvider(id).subscribe((data: any) => {
      this.getPlanList();
      this._coreService.openSnackBar('Service Provider deleted!', 'done');
    });
  }

  openEditForm(data: any) {
    console.log(data);
    this.logoBas641 = data.thumbnailImagePath;

    const dialogRef = this._dialog.open(UpdateServieProviderComponent, {

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


  getServiceSubCategoryNames(subCategoryId: number): string {
    const SubCategory = this.serviceSubCategoryModel.find(s => s.id === subCategoryId);
    return SubCategory ? SubCategory.name : '';
  }

  getServiceCategoryName(mainCategoryId: number): string {
    const categoryName = this.serviceCategoryModel.find(s => s.id === mainCategoryId);
    return categoryName ? categoryName.name : '';
  }
}
