import { Component, inject } from '@angular/core';
import { LoginManComponent } from "../_lottie/login-man/login-man.component";
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginManComponent,FormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router)
  toastr = inject(ToastrService)
  accountservice = inject(AccountService);  
  model:any = {
    
  }

  login(){
    this.accountservice.login(this.model).subscribe({
      next: _ =>{
          this.toastr.success("login Successfully")   
          this.router.navigateByUrl("") 
          
  
      },
      error: error =>
      {
         
        this.toastr.error("something bad happend :()")
        console.log(error.error.errors);
        
      }
      

      
    })
    
  }
  

}
