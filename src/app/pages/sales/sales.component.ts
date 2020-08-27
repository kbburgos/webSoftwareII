import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SalesService } from "app/core/services/sales/sales.service";
import { AuthService } from "../../core/services/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";


/**
 * @classdesc Container class of SalesComponent.
 * @desc Creation Date: 08/22/2020
 * @class 
 * @public
 * @version 2.0.0
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 */

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"],
})
export class SalesComponent implements OnInit {

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


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @desc This method is responsible for loading sales from datbase. <br> Creation Date: 08/22/2020
   * @type {Promise<void>} Void type promise.
   * @returns {JSON} JSON products
   * @author Karla Burgos <kbburgos@espol.edu.ec>
  */

  cargar() {
    this.spinner.show();
    let subs = this.sales.getcompras().subscribe(
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
