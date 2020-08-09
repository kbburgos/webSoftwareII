import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CustomerNews } from "../../resource/interface/customerNews";
import { ConfirmationService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";

import { UserNotificationService } from "../../services/user-notification.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "environments/environment";

@Component({
  selector: "app-user-notification",
  templateUrl: "./user-notification.component.html",
  styleUrls: ["./user-notification.component.css"],
})
export class UserNotificationComponent implements OnInit {

  token:any;

  cols: any[];

  listCustomerNews: CustomerNews[];

  constructor(
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private userNotification: UserNotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.token = this.authService.getJwtToken();
    console.log(this.token);
    this.userNotification.clienteNotification(this.token).subscribe((data: any) => {
      this.listCustomerNews = data;
      console.log(this.listCustomerNews);
    });

  }

  eliminarClienteNovedad(customernews){
    console.log("Eliminar novedad de cliente");
  }

}
