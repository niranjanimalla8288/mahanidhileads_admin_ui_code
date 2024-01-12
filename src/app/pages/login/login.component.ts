import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { Signup } from 'src/app/model/add-user';
import { LoginService } from 'src/app/services/login.service';
import { RoleServiceService } from 'src/app/services/role-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Signup = new Signup();
  public role: string = "";
  // public resetPasswordEmail!:string;
  // public isValidEmail!:boolean;
  constructor(private signupService: LoginService, private router: Router,
    private toastr: ToastrService, private roleService: RoleServiceService,
    // private resetpasswordservice:ResetPasswordService
  ) {

  }
  ngOnInit(): void { }
  //     this.roleService.getRoleFromStore().subscribe(data => {
  // const roleFromToken=this.signupService.getRoleFromToken();
  // this.role= data ||roleFromToken;
  //    });

  // onSubmit() {
  //   this.signupService.login(this.login).subscribe((arr: any) => {
  //     console.log(arr);
  //     this.signupService.storeToken(arr.token);
  //     const tokenPayload = this.signupService.decodedToken();
  //     if (tokenPayload && tokenPayload.role) {
  //       this.roleService.setRoleForStore(tokenPayload.role);
  //       if (tokenPayload.role == "Admin") {
  //         console.log("Logged admin");
  //         this.toastr.success("Successfully Login", "admin");
  //         this.router.navigate(["/admin"]);
  //       } else if (tokenPayload.role == "Business") {
  //         console.log("mydata");
  //         this.toastr.success("Successfully Login", "Business");
  //         this.router.navigate(["/business"]);
  //       }
  //     } else {
  //       this.toastr.error('Role information missing in the token payload', 'Login Error');
  //       return;
  //     }
  //   }
  //   );
  // }

  onSubmit() {
    this.signupService.login(this.login).subscribe(
      (arr: any) => {
        console.log(arr);
        if (arr == arr) {
          // If login is successful, store the token and navigate to the home route
          this.signupService.storeToken(arr.token);
          this.router.navigate(['/admin']);
          this.toastr.success('Login Success!', 'Success');
        } else {
          // If login is not successful (e.g., incorrect credentials)
          this.toastr.error('Invalid username or password', 'Login Failed');
        }
      },
      (error) => {
        // If there's an error during the login process
        console.error('Login Error:', error);
        this.toastr.error('Login failed. Please try again later.', 'Error');
      }
    );
  }
  // checkValidEmail(event:string){
  //   const value=event;
  //   const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/;
  //   this.isValidEmail = pattern.test(value);
  //   return this.isValidEmail;
  // }

  //   confirmToSend(){
  //     if(this.checkValidEmail(this.resetPasswordEmail)){
  //       console.log(this.resetPasswordEmail);

  //       // Api code 
  //       this.resetpasswordservice.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
  //         next:(res)=>{
  //           this.toastr.success("Sent Successfully");
  //           this.resetPasswordEmail="";
  //       const buttonRef = document.getElementById("closeBtn");
  //       buttonRef?.click();
  //         }
  // // this.toastr.error("Something went Wrong!")
  //       });
  //     }
  //   }
}