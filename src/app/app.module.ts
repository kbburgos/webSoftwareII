import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from "@angular/fire/firestore";


import {AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';

import { ProductoService  } from './services/producto.service';
import { PedidoService } from './services/pedido.service';
import { DeliverymanService } from './services/deliveryman.service';
import { DeliverymanComponent } from '../app/pages/deliveryman/deliveryman.component';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })*/
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    DeliverymanComponent,
    

  ],
  providers: [ProductoService,PedidoService,DeliverymanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
