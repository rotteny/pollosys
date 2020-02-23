import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosFinanceitosPageRoutingModule } from './documentos-financeitos-routing.module';

import { DocumentosFinanceitosPage } from './documentos-financeitos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosFinanceitosPageRoutingModule
  ],
  declarations: [DocumentosFinanceitosPage]
})
export class DocumentosFinanceitosPageModule {}
