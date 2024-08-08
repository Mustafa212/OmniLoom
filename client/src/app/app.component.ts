import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private accountservice = inject(AccountService)
  ngOnInit(): void {
    this.setCurrentUser()

   
  }
  setCurrentUser(){
    const userstring = localStorage.getItem("user")
    if(!userstring) return
    const user = JSON.parse(userstring)
    this.accountservice.currentuser.set(user)
    
   
  }
  title = 'client';
}
