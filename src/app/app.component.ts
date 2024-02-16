import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserService } from './components/service/user.service';
import { filter } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simpleapplication';
  isLoggedIn: boolean=false;
  isAdminLoggedIn: boolean=false;

constructor(
  private uService:UserService,
  private router:Router
){
  this.router.events.pipe(
    filter((event) => event instanceof NavigationStart)
  ).subscribe((event: any) => {
    if (this.uService.getCustomerAuthorization() !== null) {
      setTimeout(() => {
        this.isLoggedIn = true;
        this.isAdminLoggedIn = false;
      }, 100);
    } else {
      if (this.uService.getAdminAuthorization() !== null) {
        setTimeout(() => {
          this.isAdminLoggedIn = true;
          this.isLoggedIn = false;
        }, 100);

      } {
        setTimeout(() => {
          this.isLoggedIn = false;
          this.isAdminLoggedIn = false;
        }, 1);
      }
    }
  });
//line 20 to 41-->check when routing(url) change it will check authorization
}


}
