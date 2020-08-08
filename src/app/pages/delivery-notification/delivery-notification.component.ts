import { Component, OnInit } from "@angular/core";
import { DeliverymanNewsService } from "../../services/deliveryman-news.service";
import { DeliveryManNews } from "../../resource/interface/deliverymanNews";
import { ConfirmationService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";

import { Categoria } from "../../resource/interface/categoria";
import { CategoriaService } from "../../services/categoria.service";

@Component({
  selector: "app-delivery-notification",
  templateUrl: "./delivery-notification.component.html",
  styleUrls: ["./delivery-notification.component.css"],
})
export class DeliveryNotificationComponent implements OnInit {
  display: boolean = false;
  bandera: boolean = false;
  deliverymannew: DeliveryManNews[];
  categorias: Categoria[];

  cols: any[];

  editState: boolean = false;

  private categoria: string = 'Dulces';


  constructor(
    private deliverymanService: DeliverymanNewsService,
    private confirmationService: ConfirmationService,
    private httpClient: HttpClientModule,
    private categoriasService: CategoriaService
  ) {}

  ngOnInit() {
    this.deliverymannew = [];

    let sub = this.deliverymanService.getNovedadesRepartidores().subscribe((item: any) => {
      this.deliverymannew = item;
    });

  }


}
