import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { SalesService } from "app/core/services/sales/sales.service";
import { AuthService } from "../../core/services/auth/auth.service";

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"],
})
export class SalesComponent implements OnInit {
  //getCompras

  token: any = this.auth.getJwtToken();

  constructor(
    private http: HttpClient,

    private auth: AuthService,
    private authService: AuthService,

    private sales: SalesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.spinner.show();
    let subs = this.sales.getcompras(this.token).subscribe(
      (data: any) => {
        console.log(data);
        this.spinner.hide();
      },
      (err: any) => {
        console.log(err);
        this.spinner.hide();
        subs.unsubscribe();
      }
    );
  }
}
