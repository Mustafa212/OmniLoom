import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProductListComponent } from "../product/product-list/product-list.component";
import AOS from 'aos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit {
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    AOS.init();
    
      
    
  }
  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        document.querySelector('#' + fragment)?.scrollIntoView();
      }
    });  
  }
}
