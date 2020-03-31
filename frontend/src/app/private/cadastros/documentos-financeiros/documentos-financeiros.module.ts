import { FormDocumentosFinanceirosComponent } from './form-documentos-financeiros/form-documentos-financeiros.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosFinanceirosPageRoutingModule } from './documentos-financeiros-routing.module';

import { DocumentosFinanceirosPage } from './documentos-financeiros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosFinanceirosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DocumentosFinanceirosPage, FormDocumentosFinanceirosComponent],
  entryComponents: [FormDocumentosFinanceirosComponent]
})
export class DocumentosFinanceirosPageModule {}
