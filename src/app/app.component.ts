import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mahanidhi_admin';
  constructor(private router: Router) { }

  // isLoginPage(): boolean {
  //   const currentRoute = this.router.url;
  //   return currentRoute === '/login' || currentRoute === '/signup';
  // }

  // isShowPage = () => this.router.url === '/login' || this.router.url === '/signup';

  isLoginPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/signup' || currentRoute === 'not-found';

  }
  MyLoginPage(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/signup';
  }
}
