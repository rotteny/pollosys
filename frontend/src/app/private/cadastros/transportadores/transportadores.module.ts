import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportadoresPageRoutingModule } from './transportadores-routing.module';

import { TransportadoresPage } from './transportadores.page';
import { FormTransportadoresComponent } from './form-transportadores/form-transportadores.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportadoresPageRoutingModule
  ],
  declarations: [TransportadoresPage, FormTransportadoresComponent],
  entryComponents: [FormTransportadoresComponent]
})
export class TransportadoresPageModule {}
