import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondicoesPagamentoPageRoutingModule } from './condicoes-pagamento-routing.module';

import { CondicoesPagamentoPage } from './condicoes-pagamento.page';
import { FormCondicoesPagamentoComponent } from './form-condicoes-pagamento/form-condicoes-pagamento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondicoesPagamentoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CondicoesPagamentoPage, FormCondicoesPagamentoComponent],
  entryComponents: [FormCondicoesPagamentoComponent]
})
export class CondicoesPagamentoPageModule {}
