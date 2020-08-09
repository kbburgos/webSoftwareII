import { Component, OnInit } from "@angular/core";
import { DelivermanReporterService } from "../../services/deliverman-reporter.service";
import { NovelyDeliverman } from "../../resource/interface/noveltyDeliverman";
import { ConfirmationService } from "primeng/api";
import { HttpClientModule } from "@angular/common/http";


@Component({
  selector: "app-delivery-notification",
  templateUrl: "./delivery-notification.component.html",
  styleUrls: ["./delivery-notification.component.css"],
})
export class DeliveryNotificationComponent implements OnInit {
  display: boolean = false;
  bandera: boolean = false;
  deliverymannew: NovelyDeliverman[];

  cols: any[];

  constructor(
    private deliverymanreportService: DelivermanReporterService,
    private confirmationService: ConfirmationService,
    private httpClient: HttpClientModule
  ) { }

  ngOnInit() {

    let sub = this.deliverymanreportService.getNovedadesRepartidores().subscribe((item: any) => {
      this.deliverymannew = item;
      console.log(this.deliverymannew);
    });

  }

  eliminarRepartidorNovedad(novelydeliverman){
    console.log("Eliminar novedad de repartidor");
    this.deliverymanreportService.deleteNovedadRepartidor(novelydeliverman.idNovedad);
  }

}
