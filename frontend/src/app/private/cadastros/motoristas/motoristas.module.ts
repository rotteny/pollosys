import { FormMotoristasComponent } from './form-motoristas/form-motoristas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotoristasPageRoutingModule } from './motoristas-routing.module';

import { MotoristasPage } from './motoristas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotoristasPageRoutingModule
  ],
  declarations: [MotoristasPage, FormMotoristasComponent],
  entryComponents: [FormMotoristasComponent]
})
export class MotoristasPageModule {}
