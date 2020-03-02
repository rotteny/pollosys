import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FornecedoresPageRoutingModule } from './fornecedores-routing.module';

import { FornecedoresPage } from './fornecedores.page';
import { FormFornecedoresComponent } from './form-fornecedores/form-fornecedores.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FornecedoresPageRoutingModule
  ],
  declarations: [FornecedoresPage, FormFornecedoresComponent],
  entryComponents: [FormFornecedoresComponent]
})
export class FornecedoresPageModule {}
