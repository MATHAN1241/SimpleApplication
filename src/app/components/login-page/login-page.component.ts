import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { take } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  email: string = "";
  password: string = "";
  LoginForm:any = new FormGroup({});

  constructor(
    private router: Router,
    private uservice: UserService,
    private fb: FormBuilder
  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit(): void {

  }

  
  signIn():void{
    const body={
      "emailID": this.LoginForm.controls['email'].value,
      "password": this.LoginForm.controls['password'].value
    }
console.log("======>");
this.uservice.customerSignIn(body).pipe(take(1)).subscribe((res:any)=>{
  console.log("*****",res);
  if(res && res?.customerId){
    this.uservice.storeCustomerAuthorization(res?.customerId);
    let userName='';
    if(res?.firstName){
      userName+=res?.firstName;
    }
    if(res?.lastName){
      userName+=' '+res?.lastName;
    }
    this.uservice.storeCustomerUserName(userName);
    this.router.navigate(['/customer/home']);
  }
  
}, (err: any) =>{
  console.log("Error ",err);
  alert("Something going wrong in login! pl try again");
})

}
routeToNewUser():void{
  this.router.navigate(["/customer-register"]);
}

routeToForgotPassword():void{
  this.router.navigate(["/forgot-password"]);
}


}
