import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpresasPageRoutingModule } from './empresas-routing.module';

import { EmpresasPage } from './empresas.page';
import { FormEmpresasComponent } from './form-empresas/form-empresas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpresasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmpresasPage, FormEmpresasComponent],
  entryComponents: [FormEmpresasComponent]
})
export class EmpresasPageModule {}
