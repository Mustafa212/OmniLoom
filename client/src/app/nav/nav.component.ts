import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClickOutsideDirective } from '../_directives/click-outside.directive';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf,ClickOutsideDirective , RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
   accountservice = inject(AccountService)
   private router = inject(Router)
  dropdownOpen = false;
  islogged = false
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen)
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout(){
    this.accountservice.logout()
    this.router.navigateByUrl("")
  }
}
