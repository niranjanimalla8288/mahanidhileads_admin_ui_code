import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService,
    private router: Router, private toastr: ToastrService) { }
  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //   const expectedRole = route.data['expectedRole'];

  //   if (this.authService.isLoggedIn()) {
  //     const userRole = this.authService.getRoleFromToken();
  //     if (userRole === expectedRole) {
  //       return true;
  //     } else {
  //       this.toastr.error('You do not have permission to access this page.', 'Access Denied');
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  //   } else {
  //     this.toastr.error('Please Login First!', 'Authentication Required');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(): boolean {

    if (this.authService.isLoggedIn()) {

      return true;
    }
    else {
      this.toastr.error('Please Login First!');
      this.router.navigate(['/login'])
      return false;
    }
  }
}
