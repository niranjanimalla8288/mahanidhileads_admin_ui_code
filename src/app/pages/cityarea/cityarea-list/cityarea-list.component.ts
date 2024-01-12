import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { CityareaService } from 'src/app/services/cityarea.service';
import { CityareaComponent } from '../city-create/cityarea.component';
import { CityService } from 'src/app/services/city.service';
import { Badge } from 'src/app/model/badge';
import { StateService } from 'src/app/services/state.service';
import { CityCreateComponent } from '../../city/city-create/city-create.component';

@Component({
  selector: 'app-cityarea-list',
  templateUrl: './cityarea-list.component.html',
  styleUrls: ['./cityarea-list.component.css']
})
export class CityareaListComponent implements OnInit {



  displayedColumns: string[] = [
    // 'id',
    // 'name',
    // 'stateId',
    // 'gpslocation',
    // 'action'
    'name',
    'cityId',
    'pinCode',
    'gpslocation',
    'searchRadiusInKms',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  planModel: Badge = new Badge();
  // id: number = 0;
  States: any[] = [];
  City: any[] = [];
  cityArea: any;
  constructor(
    private _dialog: MatDialog,
    private _cityService: CityService,
    private _cityAreasService: CityareaService,
    public stateservice: StateService,
    private _coreService: CoreService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getCityAreaList();
    // this.empForm.patchValue(this.data);
    this.stateservice.getStates().subscribe((data: any) => {
      console.log("statedata" + data);
      this.States = data
    });

    this._cityAreasService.getCityareas().subscribe((data: any) => {
      this.cityArea = data;
      console.log(data, "city areaa data");
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CityCreateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityAreaList();
        }
      },
    });
  }

  getCityAreaList() {
    this._cityAreasService.getCityareas().subscribe((res: any) => {
      console.log(res, "city area list");
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
    this._cityService.deleteCity(id).subscribe((data: any) => {
      this.getCityAreaList();
      this._coreService.openSnackBar('City deleted!', 'done');
    });
  }


  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._dialog.open(CityCreateComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCityAreaList();
        }
      },
    });
  }



  getCityName(cityId: number): string {
    const State = this.States.find(c => c.id === cityId);
    return State ? State.name : '';
  }

}
