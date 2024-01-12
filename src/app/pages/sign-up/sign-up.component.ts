import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Signup } from 'src/app/model/add-user';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signup: Signup = new Signup();


  constructor(public signupAPI: LoginService, public router: Router,
    private toaster: ToastrService) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.signupAPI.signUp(this.signup).subscribe(data => {
      console.log(data);
      this.toaster.success('Successfully Registered');
      this.router.navigate(["/login"]);

    });
  }

}