import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthDeliverymanService } from '../services/deliverman/auth-deliveryman.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDeliverymanGuard implements CanActivate {
  
  constructor(private authDeliveryman : AuthDeliverymanService, private router: Router) { }


  canActivate(): boolean {
    if(this.authDeliveryman.getLogginFirebase()) {
      return true;
    } else {
      this.router.navigate(['deliveryman']);
      return false;
    }
  }
}
