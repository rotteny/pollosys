import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormCondicoesPagamentoComponent } from './form-condicoes-pagamento.component';

describe('FormCondicoesPagamentoComponent', () => {
  let component: FormCondicoesPagamentoComponent;
  let fixture: ComponentFixture<FormCondicoesPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCondicoesPagamentoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCondicoesPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
