import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)
  baseurl = environment.apiUrl;
  currentuser = signal<User|null>(null)
  isUModalVisible = signal<boolean>(false);

  
  login(model:any){
    return this.http.post<User>(this.baseurl+"account/login" , model).pipe(
      map(
        user=>{
          if (user)this.setCurrentUser(user)
                    
        }
      )
    );
  }

  register(model:any){
    return this.http.post<User>(this.baseurl+"account/register" , model).pipe(
      map(
        user=>{
          if (user)this.setCurrentUser(user)
          
          return user
        }

        
      )

    );
  }


  
  setCurrentUser(user:User){
    localStorage.setItem("user" , JSON.stringify(user));
    this.currentuser.set(user);

  }

  logout(){
    localStorage.removeItem("user");
    this.currentuser.set(null);
  }

 
}
