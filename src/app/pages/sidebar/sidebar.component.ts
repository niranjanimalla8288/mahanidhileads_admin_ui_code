import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from 'src/app/model/add-user';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],


})

export class SidebarComponent implements OnInit {
  opened = true;
  playerData: any;
  registerDetails: any;
  constructor(private route: Router, private authService: LoginService) { }
  ngOnInit() {
    console.log("user details");
    // this.playerData = this.authService.getCustomer();
    console.log(this.playerData);
    console.log("registerf details");


  }
  SignOut() {
    this.authService.signOut();
    this.route.navigate(["/login"])
  }



}


