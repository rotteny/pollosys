import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { FormClientesComponent } from './form-clientes/form-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskIonicModule,
  ],
  declarations: [ClientesPage, FormClientesComponent],
  entryComponents: [FormClientesComponent]
})
export class ClientesPageModule {}
