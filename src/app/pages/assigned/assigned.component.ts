import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { DeliverymanService } from 'app/services/deliveryman.service';
import { Orders } from 'app/resource/interface/orders';
import { AuthService } from 'app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css']
})
export class AssignedComponent implements OnInit {
  pedidosAsignados: Orders[];
  cols: any;
  token: any;
  private pedidosAsignadosSuscribe;

  constructor(private pedidoService: PedidoService,
    private http: HttpClient,
     private deliveryManService: DeliverymanService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.pedidosAsignados = [];

    this.pedidosAsignadosSuscribe = this.pedidoService.getPedidos().subscribe((item: any) => {  
      console.log(item);
      for(let i = 0; i < item.length; i++){
        if(item[i]["estado"] == "asignado"){
          this.pedidosAsignados.push(item[i]);
        }
      }
   
    });

    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjQ5OTU0MjYiLCJpYXQiOjE1OTY4NjA4MTQsImV4cCI6MTU5Njg2MTcxNH0.4UWYD-GQXk0_AQ3LXfsyTaS3SsmYQlGmU94tYycyT6Q";
    console.log(this.token);
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.token};
    this.http.get(environment.rutas.novedades+"nusuario/",{headers}).subscribe( data =>{
        console.log(data);
    });

  }
  assinggnOrder(pedidosAsignados){
    
  }

  ngOnDestroy(){
    if(this.pedidosAsignadosSuscribe){
      this.pedidosAsignadosSuscribe.unsubscribe();
    }
  }

}
