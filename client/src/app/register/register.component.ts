import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule  , RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private router = inject(Router)
  toastr = inject(ToastrService)
  accountservice = inject(AccountService);  
  model:any = {}
  register(){
    this.accountservice.register(this.model).subscribe({
      next: _ =>{
          this.toastr.success("registered Successfully")   
          this.router.navigateByUrl("") 
          
  
      },
      error: error =>
      {
         
        this.toastr.error("something bad happend :()")
        console.log(error.error);
        
      }
      

      
    })
    
  }
}
