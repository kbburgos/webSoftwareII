import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeliverymanService } from 'app/services/deliveryman.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDeliverymanGuard implements CanActivate {
  
  constructor(private deliveryManService : DeliverymanService, private router: Router){ }

  canActivate(): boolean{
    if(this.deliveryManService.getLoggin()){
      return true;
    }else{
      this.router.navigate(["/deliveryman"]);
      return false;
    }
  }
  
}
