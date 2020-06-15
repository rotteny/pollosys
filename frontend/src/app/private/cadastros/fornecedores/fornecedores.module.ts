import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FornecedoresPageRoutingModule } from './fornecedores-routing.module';

import { FornecedoresPage } from './fornecedores.page';
import { FormFornecedoresComponent } from './form-fornecedores/form-fornecedores.component';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FornecedoresPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskIonicModule,
  ],
  declarations: [FornecedoresPage, FormFornecedoresComponent],
  entryComponents: [FormFornecedoresComponent]
})
export class FornecedoresPageModule {}
