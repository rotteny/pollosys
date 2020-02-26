import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTiposMovimentacaoComponent } from './form-tipos-movimentacao.component';

describe('FormTiposMovimentacaoComponent', () => {
  let component: FormTiposMovimentacaoComponent;
  let fixture: ComponentFixture<FormTiposMovimentacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTiposMovimentacaoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTiposMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
