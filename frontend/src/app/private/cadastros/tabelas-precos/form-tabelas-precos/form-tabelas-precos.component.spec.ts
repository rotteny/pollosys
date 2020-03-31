import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormTabelasPrecosComponent } from './form-tabelas-precos.component';

describe('FormTabelasPrecosComponent', () => {
  let component: FormTabelasPrecosComponent;
  let fixture: ComponentFixture<FormTabelasPrecosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTabelasPrecosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTabelasPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
